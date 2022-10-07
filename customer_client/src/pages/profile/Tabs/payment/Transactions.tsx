import React, {useEffect, useState} from 'react';
import tw from "twin.macro";
import {ArrowDropDown, ArrowDropUp} from "@mui/icons-material";
import {TransactionService} from "../../../../services/TransactionService";
import {Transaction} from "../../../../types/card";
import moment from "moment";

const TransactionList = tw.div`my-10`;


const Transactions = () => {


    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {

        const fetchTransactions = async () => {
            const { data } = await TransactionService.getTransactionsByCustomerId(7);
            setTransactions([...data]);
        }
        fetchTransactions();


    }, [])

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
                                <div className="gh gt">Order ID</div>
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
                            transactions.map(transaction =>
                                <tr key={transaction.id}>
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
                                                <ArrowDropDown color='error'
                                                               style={{ width: '36px', height: '36px'}}
                                                />
                                                {/*<img className="op sv rounded-full" src="./images/transactions-image-01.svg" width="36" height="36" alt="Transaction 01" />*/}
                                            </div>
                                            <div className="gp text-slate-800">
                                                #{transaction.order_id}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm">
                                        <div className="gt">
                                            {moment(transaction.created_at).format('DD/MM/YYYY')}
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm">
                                        <div className="gt">
                                            <div className="go inline-flex gp hc ys rounded-full gn vp vf">
                                                Completed
                                            </div>
                                        </div>
                                    </td>
                                    <td className="vi wy w_ vo lm of">
                                        <div className="gr gz gp" style={{color: 'red'}}>
                                            -${transaction.summa}
                                        </div>
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