import React, {useEffect, useState} from 'react';
import AnimationRevealPage from "../../../helpers/AnimationRevealPage";
import OrderDetail from "../../../components/modals/OrderDetail";
import tw from "twin.macro";
import {Container as ContainerBase} from "../../../components/misc/Layouts";
import {Button} from "@mui/material";
import CreditCardModal from "../../../components/modals/CreditCardModal";
import {useParams} from "react-router-dom";
import {Transaction} from "../../../types/card";
import {TransactionService} from "../../../services/TransactionService";
import {Order} from "../../../types/order";
import {OrderService} from "../../../services/OrderService";

const Container = tw(ContainerBase)`min-h-screen text-white font-medium`;
const Content = tw.div`max-w-screen-xl my-0 sm:my-8 bg-white text-gray-900 shadow drop-shadow-lg sm:rounded-lg mx-auto py-10`;


const OrderPage = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { orderId } = useParams();

    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const { data } = await OrderService.getOrder(orderId!);
            setOrder(data);
        }
        fetchOrder();

    }, []);

    return (
        <AnimationRevealPage>
            <CreditCardModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                withCards={true}
                order={order}
                mode='pay'
            />
            <Container>
                <Content>
                    {
                        order &&
                        <OrderDetail order={order} />
                    }


                    {/*Card list*/}

                    <br/>

                    {
                        order?.project &&
                        <Button variant='contained' onClick={() => {
                            setIsOpen(true);
                        }}>
                            Pay with credit card
                        </Button>
                    }

                </Content>
            </Container>
        </AnimationRevealPage>

    );
};

export default OrderPage;