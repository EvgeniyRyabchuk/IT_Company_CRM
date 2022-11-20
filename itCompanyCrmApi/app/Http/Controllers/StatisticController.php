<?php

namespace App\Http\Controllers;


use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use App\Models\Project;
use App\Models\Status;
use App\Models\UndoOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticController extends Controller
{

    public function index(Request $request)
    {
        $ordersDynamicMetric =
            StatisticController::getDynamicMetric(9, Order::class);
        $customerDynamicMetric =
            StatisticController::getDynamicMetric(9, Customer::class);

        $funnelSales = StatisticController::getFunnelSalesByOrderStatuses();
        $orderStatusesCounter = StatisticController::getOrderStatusesCountByOrders();

        $orderRatio = StatisticController::getOrderRatio();


        $undoCasesGrouped = UndoOrder::with('orderUndoCase')
            ->select('order_undo_case_id', DB::raw('count(*) as total'))
            ->join('undo_order_cases', 'undo_order_cases.id', 'undo_orders.order_undo_case_id')
            ->groupBy('order_undo_case_id')
            ->get();

        $biggestProjects = Project::with('projectType')
            ->where('paid', '>', 0)
            ->orderBy('paid', 'desc')->get();

        return response()->json(compact(
       'ordersDynamicMetric',
       'customerDynamicMetric',
                 'funnelSales',
                'orderStatusesCounter',
                'orderRatio',
                'undoCasesGrouped',
                'biggestProjects'
        ));
    }


    public static function getOrderRatio() {
        $undoStatus = Status::where('name', 'Undo')->first();
        $finishedStatus = Status::where('name', 'Finished')->first();
        $totalOrderCount = Order::count();
        $activeOrderCount = Order::where('status_id', '!=', $undoStatus->id)
            ->where('status_id', '!=', $finishedStatus->id)
            ->count();
        $undoOrderCount = Order::where('status_id', $undoStatus->id)->count();
        $finishedOrderCount = Order::where('status_id', $finishedStatus->id)->count();

        return [
            'total'=> $totalOrderCount,
            'payload' => [
                ['name' => 'Undo', 'value' => $undoOrderCount],
                ['name' => 'Active', 'value' => $activeOrderCount],
                ['name' => 'Finished', 'value' => $finishedOrderCount],
            ]
        ];
    }

    public static function getDynamicMetric($lastMonthCount = 9, $model) {
        $currentMonth = Carbon::now()->startOfMonth();
        $DynamicMetric = [];

        for ($i = $lastMonthCount; $i >= 0; $i--) {
            $date =  $i === 0 ? $currentMonth : Carbon::now()->subMonth($i);
            $dateStart = $date->copy()->startOfMonth();
            $dateEnd = $date->copy()->endOfMonth();

            $count = $model::whereBetween('created_at', [
                $dateStart,
                $dateEnd,
            ])->count();
            $DynamicMetric[] = [
                'value' => $count,
                "title" => $dateStart->toString()
            ];
        }

        return $DynamicMetric;
    }

    public static function getFunnelSalesByOrderStatuses($lastMonthCount = null) {
        $orderStatuses = Status::where('name', '!=', 'Undo')
            ->orderBy('index', 'asc')
            ->get();

        $stack = [];


        foreach ($orderStatuses as $orderStatus) {
            $query = OrderStatusHistory::where('status_id', $orderStatus->id);

            $stack[] = [
                'status' => $orderStatus,
                'count' => $query->count(),
                'percent' => 0
            ];
        }

        $total = $stack[0]['count'];
        if($total) {
            for ($i = 0; $i < count($stack); $i++) {
                $count = $stack[$i]['count'];
                $stack[$i]['percent'] = round(($count / $total) * 100, 2);
            }
        }

        return [
            'stack' => $stack,
            'total' => $total
        ] ;
    }

    public static function getOrderStatusesCountByOrders($lastMonthCount = null) {
        $query = Order::query();
        $query->with('status');
        $query
            ->join('statuses', 'statuses.id', 'orders.status_id')
            ->select('status_id', DB::raw('count(*) as total'))
            ->groupBy('status_id')

            ->orderBy('total', 'desc');

        $data = $query->get();
        return $data;
    }



}
