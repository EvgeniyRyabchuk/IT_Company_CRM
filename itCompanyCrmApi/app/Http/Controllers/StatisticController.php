<?php

namespace App\Http\Controllers;


use App\Models\Order;
use App\Models\OrderStatusHistory;
use App\Models\Status;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticController extends Controller
{

    public function index(Request $request)
    {

        $ordersDynamicMetric = StatisticController::getOrdersDynamicMetric(9);
        $funnelSales = StatisticController::getFunnelSalesByOrderStatuses();
        $orderStatusesCounter = StatisticController::getOrderStatusesCountByOrders();

        return response()->json(compact(
       'ordersDynamicMetric',
       'funnelSales',
                'orderStatusesCounter'
        ));
    }

    public static function getOrdersDynamicMetric($lastMonthCount = 9) {
        $currentMonth = Carbon::now()->startOfMonth();
        $ordersDynamicMetric = [];

        for ($i = $lastMonthCount; $i >= 0; $i--) {
            $date =  $i === 0 ? $currentMonth : Carbon::now()->subMonth($i);
            $dateStart = $date->copy()->startOfMonth();
            $dateEnd = $date->copy()->endOfMonth();

            $count = Order::whereBetween('created_at', [
                $dateStart,
                $dateEnd,
            ])->count();
            $ordersDynamicMetric[] = [
                'value' => $count,
                "title" => $dateStart->toString()
            ];
        }

        return $ordersDynamicMetric;
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
