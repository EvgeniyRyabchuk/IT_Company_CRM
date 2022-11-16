<?php

namespace Database\Seeders;

use App\Models\ProjectType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $models = [
            [
                'name' => 'Landing page',
                'description' =>
                    'We will develop a creative landing page to promote your product, services or events.
                    We use maximum useful information for the most effective engagement of your clients.',
                'fromTerm' => 1,
                'fromTermType' => 'week',
                'fromPrice' => 700
            ],
            [
                'name' => 'Online Store',
                'description' => '
                    Based on the scale and nature of your business,
                    we will offer the optimal design and structure of the site for online sales of your products.
                    We create online stores in which you want to make purchases.
                ',
                'fromTerm' => 3,
                'fromTermType' => 'week',
                'fromPrice' => 2000
            ],
            [
                'name' => 'Corporate Site',
                'description' => '
                    We develop unique sites for successful companies.
                    Take into account all the features of your business.
                    Make the web-resource convenient both for the interaction with clients,
                    and for the work of employees..
                ',
                'fromTerm' => 3,
                'fromTermType' => 'week',
                'fromPrice' => 1200
            ],
            [
                'name' => 'Visiting card website',
                'description' => '
                    We will create a small website (up to 10 pages), which will briefly provide all the necessary
                    information about your company on the Internet: description, range of goods or services,
                    photos, contact details, etc.
                ',
                'fromTerm' => 1,
                'fromTermType' => 'week',
                'fromPrice' => 600
            ],
            [
                'name' => 'One-page website',
                'description' => '
                    Your business does not require creation of an extensive site structure and a large number of landing pages?
                    Perhaps you need a one-page website. Brief information does not mean incomplete.
                ',
                'fromTerm' => 1,
                'fromTermType' => 'week',
                'fromPrice' => 500
            ],
            [
                'name' => 'Catalog website',
                'description' => '
                    This site type is suitable for those who need to present a wide range of goods,
                    services, projects or any other information on the Internet.
                    Unlike an online store, there is usually no purchase functionality on such a website..
                ',
                'fromTerm' => 1,
                'fromTermType' => 'month',
                'fromPrice' => 1200
            ],
            [
                'name' => 'Informational website',
                'description' => '
                    We will create an online representation of a newspaper or magazine,
                    an educational or news informational resource on any subject.
                    We equip the site with a thought-out structure and add the necessary
                    functions to make publishing convenient.
                ',
                'fromTerm' => 3,
                'fromTermType' => 'week',
                'fromPrice' => 800
            ],
            [
                'name' => 'Turnkey website',
                'description' => '
                    Do you want to get a completely finished project that does not need all sorts of additions and modifications?
                    We offer turnkey website development: supply the resource with all the necessary functionality from the start,
                    and also prepare it for promotion.
                ',
                'fromTerm' => 2,
                'fromTermType' => 'month',
                'fromPrice' => 2300
            ],
            [
                'name' => 'Internet portal',
                'description' => '
                    A portal is a large online resource that combines different types of functionality
                    (such as news feed, forum, help service and online voting) within one site.
                    With the right approach, it can be a very effective tool
                ',
                'fromTerm' => 1,
                'fromTermType' => 'month',
                'fromPrice' => 2000
            ],
            [
                'name' => 'Blog',
                'description' => '
                    We develop both personal and corporate blogs on various topics.
                    We are planning a blog in a way to make easy to fill with information and interesting for readers.
                ',
                'fromTerm' => 3,
                'fromTermType' => 'week',
                'fromPrice' => 600
            ],

        ];

        ProjectType::insert($models);
    }
}
