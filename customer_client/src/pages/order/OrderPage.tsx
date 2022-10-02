import React, {useState} from 'react';
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import OrderDetail from "../../components/modals/OrderDetail";
import tw from "twin.macro";
import {Container as ContainerBase} from "../../components/misc/Layouts";
import {Button} from "@mui/material";
import AddCreditCard from "../../components/modals/AddCreditCard";

const Container = tw(ContainerBase)`min-h-screen text-white font-medium`;
const Content = tw.div`max-w-screen-xl my-0 sm:my-8 bg-white text-gray-900 shadow sm:rounded-lg mx-auto`;


const OrderPage = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <AnimationRevealPage>
            <AddCreditCard
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                withCards={true}
            />
            <Container>
                <Content>
                    <OrderDetail />

                    Card list

                    <br/>

                    <Button variant='contained' onClick={() => {
                        setIsOpen(true);
                    }}>
                        Pay with credit card
                    </Button>
                </Content>
            </Container>
        </AnimationRevealPage>

    );
};

export default OrderPage;