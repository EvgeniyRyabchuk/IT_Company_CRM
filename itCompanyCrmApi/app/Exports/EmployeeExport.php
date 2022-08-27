<?php

namespace App\Exports;

use App\Models\Employee;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EmployeeExport implements FromCollection, WithMapping, WithHeadings
{

    protected $ids = [];

    function __construct($ids)
    {
        $this->ids = $ids;
    }

        /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        if(count($this->ids) > 0) {
            return Employee::with('position', 'level', 'user')->whereIn('id', $this->ids)->get();
        } else {
            return Employee::with('position', 'level', 'user')->get();
        }
    }

    public function map($employee) : array {
        return [
            $employee->id,
            $employee->user->full_name,
            $employee->user->email,
            $employee->position->name,
            $employee->level->name,
            Carbon::parse($employee->updated_at)->toFormattedDateString(),
            Carbon::parse($employee->created_at)->toFormattedDateString()
        ] ;


    }

    public function headings() : array {
        return [
            '#',
            'full_name',
            'email',
            'position_name',
            'level_name',
            'updated_at',
            'created_at'
        ] ;
    }
}
