<?php

namespace App\Http\Controllers;

use App\_Sl\_Statistic;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Order;
use App\Models\Project;
use App\Models\ProjectType;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function analytics(Request $request) {
        $customerCount = Customer::count();
        $employeeCount = Employee::count();
        $ordersCount = Order::count();

        $today = Carbon::now();
        $weekAgo = Carbon::now()->subWeek();
        $weeklyRevenue =
            Transaction::whereBetween('created_at', [$weekAgo, $today])
            ->sum('transactions.summa');

        $counter = [
            'customers' => $customerCount,
            'employees' => $employeeCount,
            'weeklyRevenue' => $weeklyRevenue,
            'orders' => $ordersCount,
        ];

        //////////

        $percentProjectTypes = [];
        $projecTypes = ProjectType::all();
        $total = Project::count();
        foreach ($projecTypes as $projecType) {
            $ptCount = Project::where('project_type_id', $projecType->id)->count();
            $percent = $ptCount / $total * 100;
            $percentProjectTypes[] = [
                'target' => $projecType,
                'percent' => $percent,
                'absolute' => $ptCount
            ];
        }

        //////////

        // thisMonth or lastMonth
        $lastOrdersDateRangeType = $request->input('lastOrdersDateRangeType');
        switch ($lastOrdersDateRangeType) {
            case 'thisMonth':
                $start = Carbon::now()->startOfMonth();
                $end = Carbon::now()->endOfMonth();

                $lastOrders =
                    Order::with('project.projectType', 'status', 'customer.user')
                        ->whereBetween('created_at', [$start, $end])
                        ->orderBy('created_at',  'desc')
                        ->get()
                        ->take(5);
                break;
            case 'lastMonth':
                $lastMonth = Carbon::now()->subMonth();

                $start =  Carbon::now()->subMonth()->startOfMonth();
                $end =  Carbon::now()->subMonth()->endOfMonth();

                $lastOrders = Order::with('project.projectType', 'status', 'customer.user')
                    ->whereBetween('created_at', [$start, $end])
                    ->orderBy('created_at',  'desc')
                    ->get()
                    ->take(5);

                break;
            default:
                $lastOrders = Order::with('project.projectType', 'status', 'customer.user')
                    ->orderBy('created_at',  'desc')
                    ->get()
                    ->take(5);

                break;
        }

        $lastProjects =
            Project::with('projectType', 'employees.user')
                ->orderBy('created_at', 'desc')
                ->get()
                ->take(4);

        //////////

        $startLastWeekRevenue = Carbon::now()->subWeek()->startOfWeek();
        $endLastWeekRevenue = Carbon::now()->subWeek()->endOfWeek();

        $startBeforeLastWeekRevenue = Carbon::now()->subWeek(2)->startOfWeek();
        $endBeforeLastWeekRevenue = Carbon::now()->subWeek(2)->endOfWeek();

        $increases[] =_Statistic::getIncreaseInDateRange(
            [$startLastWeekRevenue, $endLastWeekRevenue],
            [$startBeforeLastWeekRevenue, $endBeforeLastWeekRevenue],
            'transactions', 'summa');

        $increases[] =_Statistic::getIncreaseInDateRange(
            [$startLastWeekRevenue, $endLastWeekRevenue],
            [$startBeforeLastWeekRevenue, $endBeforeLastWeekRevenue],
            'customers', null);

        return response()->json(compact(
    'counter',
    'percentProjectTypes',
             'lastOrders',
             'lastProjects',
             'increases'
        ));
    }
}
