<?php

namespace App\_Sl;



use App\Models\Transaction;
use ReflectionClass;

class _Statistic
{

    public static function getIncreaseInDateRange
    ($lastDateRange, $beforeLastDateRange, $tableName, $column) {

        $model = Utils::getModelByTableName($tableName);

        if(!is_null($column)) {
            $targetCol = $tableName . '.'. $column;

            $lastWeekRevenue =
                $model::whereBetween('created_at', $lastDateRange)
                    ->sum($targetCol);

            $beforeLastWeekRevenue =
                $model::whereBetween('created_at', $beforeLastDateRange)
                    ->sum($targetCol);
        }
        else {
            $lastWeekRevenue =
                $model::whereBetween('created_at', $lastDateRange)->count();
            $beforeLastWeekRevenue =
                $model::whereBetween('created_at', $beforeLastDateRange)->count();
        }

         return [
             'targetName' => $tableName,
             'percent' => (($beforeLastWeekRevenue - $lastWeekRevenue)
                     / $lastWeekRevenue) * 100,
             'absolute' => $beforeLastWeekRevenue - $lastWeekRevenue,
             'last' => $lastWeekRevenue,
             'beforeLast' => $beforeLastWeekRevenue
         ];

    }
}
