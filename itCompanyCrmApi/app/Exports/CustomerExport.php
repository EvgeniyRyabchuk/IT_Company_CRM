<?php

namespace App\Exports;

use App\Models\Customer;
use App\Models\Employee;
use Carbon\Carbon;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CustomerExport implements FromCollection, WithMapping, WithHeadings
{

    protected $ids = [];

    public function __construct($ids)
    {
        $this->ids = $ids;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        if(count($this->ids) > 0) {
            return Customer::with('user', 'user.phones')
                ->whereIn('id', $this->ids)->get();
        } else {
            return Customer::with('user')->get();
        }
    }

    public function map($customer) : array {
        $phones = '';
        foreach ($customer->user->phones as $phone)
            $phones .=  $phone->phone_number . ', ';

        return [
            $customer->id,
            $customer->user->full_name,
            $customer->user->email,
            $phones,
            Carbon::parse($customer->updated_at)->toFormattedDateString(),
            Carbon::parse($customer->created_at)->toFormattedDateString()
        ] ;


    }

    public function headings() : array {
        return [
            '#',
            'full_name',
            'email',
            'phones',
            'updated_at',
            'created_at'
        ] ;
    }
}
