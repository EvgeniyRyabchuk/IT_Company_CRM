import React from 'react';
import tw from "twin.macro";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";

const TransactionList = tw.div`my-10`;


const Transactions = () => {
    return (
        <TransactionList className="bg-white">
            <div x-data="handleSelect">

                <div className="lf">
                    <table className="ux ou">
                        <thead className="go gh gv text-slate-500 co cs border-slate-200">
                        <tr>
                            <th className="vi wy w_ vo lm of">
                                <div className="flex items-center">
                                    <label className="inline-flex">
                                        <span className="d">Select all</span>
                                        <input id="parent-checkbox" className="i" type="checkbox" />
                                    </label>
                                </div>
                            </th>
                            <th className="vi wy w_ vo lm">
                                <div className="gh gt">Counterparty</div>
                            </th>
                            <th className="vi wy w_ vo lm">
                                <div className="gh gt">Payment Date</div>
                            </th>
                            <th className="vi wy w_ vo lm">
                                <div className="gh gt">Status</div>
                            </th>
                            <th className="vi wy w_ vo lm">
                                <div className="gh gr">Amount</div>
                            </th>
                        </tr>
                        </thead>

                        <tbody className="text-sm le lr cs border-slate-200">

                        {
                            Array.from(Array(10).keys()).map(e =>
                                <tr>
                                    <td className="vi wy w_ vo lm of">
                                        <div className="flex items-center">
                                            <label className="inline-flex">
                                                <span className="d">Select</span>
                                                <input className="table-item i" type="checkbox" />
                                            </label>
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm zi">
                                        <div className="flex items-center">
                                            <div className="op sv ub mr-2 _b">
                                                <ArrowDropDown color='error' style={{ width: '36px', height: '36px'}}/>
                                                {/*<img className="op sv rounded-full" src="./images/transactions-image-01.svg" width="36" height="36" alt="Transaction 01" />*/}
                                            </div>
                                            <div className="gp text-slate-800">Form Builder CP</div>
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm">
                                        <div className="gt">22/01/2022</div>
                                    </td>
                                    <td className="vi wy w_ vo lm">
                                        <div className="gt">
                                            <div className="go inline-flex gp hc ys rounded-full gn vp vf">Completed</div>
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm of">
                                        <div className="gr gz gp">-$1,299.22</div>
                                    </td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>

                </div>
            </div>
        </TransactionList>

    );
};

export default Transactions;