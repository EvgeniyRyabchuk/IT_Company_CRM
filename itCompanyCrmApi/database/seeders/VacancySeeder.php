<?php

namespace Database\Seeders;

use App\Models\Vacancy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VacancySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        Vacancy::factory()->count(10)->create();

        $models = [
           [
               'title' => 'Python Backend Developer',
               'text' => '
                   Python Developer responsibilities include writing and testing code,
                   debugging programs and integrating applications with third-party web services.
                   To be successful in this role, you should have experience using server-side logic
                   and work well in a team.
               ',
               'required' => true
           ],
            [
                'title' => 'Full Time Web Designer',
                'text' => '
                   Web designers plan, create and code internet sites and web pages,
                   many of which combine text with sounds, pictures, graphics and video clips.
                   A web designer is responsible for creating the design and layout of a website
                   or web pages. It and can mean working on a brand new website or updating an already
                   existing site.
               ',
                'required' => true
            ],
            [
                'title' => 'Outsource QA engineer',
                'text' => '
                      A QA Engineer is a professional who finds and fixes bugs in a product or
                      program before its launch, collaborating with developers on fixes to those problems
                      when necessary. They\'re needed across many industries, including automotive, medical
                      devices and food/beverage.
                   ',
                'required' => false
            ],
            [
                'title' => 'Data analyst',
                'text' => '
                      A data analyst collects, cleans, and interprets data sets in order to answer
                      a question or solve a problem. They work in many industries, including business,
                       finance, criminal justice, science, medicine, and government.
                   ',
                'required' => false
            ],
            [
                'title' => 'Client Manager',
                'text' => '
                      Also known as customer care managers or client relations managers,
                      client services managers handle and resolve client queries, develop strategies for
                      improving customer services, train other client services staff,
                      authorize refunds on products, maintain business relationships with existing clients,
                      and bring new clients on board.
                   ',
                'required' => false
            ],
        ];

        Vacancy::insert($models);

    }
}
