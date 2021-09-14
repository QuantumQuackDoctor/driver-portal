import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {assignOrder, getOrders} from "../../../services/OrderService";
import "./DisplayOrdersPage.css";
import {Button, Col, Container, Row} from "react-bootstrap";
import {getCurrentDriver} from "../../../services/DriverService";


const DisplayOrdersPage = ({ authenticated }) => {
    const history = useHistory();

    const [currentDriver, setCurrentDriver] = useState({
        id: 0,
        email: "",
        DOB: "",
        firstName: "",
        lastName: "",
        phone: "",
        veteranStatus: "",
        points: 0,
        settings: {
            notifications: {
                email: false,
                text: false,
            },
            theme: "light",
        },
    });
    useEffect(() => {
        if (authenticated) {
            getCurrentDriver().then((res) => {
                setCurrentDriver(res.data);
            });
        }
    }, [authenticated]);

    const [orders, setOrders] = useState([{
        id: 0,
        orderType: "delivery",
        driverId: null,
        restaurantId: null,
        driverNote: null,
        address: null,
        orderTime: {
            orderPlaced: null,
            restaurantAccept: null,
            restaurantStart: null,
            restaurantComplete: null,
            driverAccept: null,
            delivered: null,
            deliverySlot: null,
        },
        refunded: null,
        price: {
            food: 0.0,
            delivery: 0.0,
            tip: 0.0,
        },
        food: null,
    },
    {
        id: 1,
        orderType: "delivery",
        driverId: null,
        restaurantId: null,
        driverNote: null,
        address: null,
        orderTime: {
            orderPlaced: null,
            restaurantAccept: null,
            restaurantStart: null,
            restaurantComplete: null,
            driverAccept: null,
            delivered: null,
            deliverySlot: null,
        },
        refunded: null,
        price: {
            food: 0.0,
            delivery: 0.0,
            tip: 0.0,
        },
        food: null,
    }]);

    const [driverOrderInfo, setDriverOrderInfo] = useState([
        {
            id: 1,
            orderType: "delivery",
            restaurantName: "RestaurantName",
            address: "Address",
            orderTime: {
                restaurantComplete: "WhenToPickUp",
                deliverySlot: "DropOffTime",
            },
            price: {
                food: 0.0,
                delivery: 0.0,
                tip: 0.0,
            },
            food: null,
        }
    ]);

    // const [restaurants, setRestaurants] = useState({});
    const [sortType, setSortType] = useState("time");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const setDriverOrderInfoHelper = (data) => {
        let orderInfo = data.map((order) => {
            return {
                id: order.id,
                orderType: order.orderType,
                restaurantNames: "test",
                address: order.address,
                orderTime: {
                    restaurantComplete: order.orderTime.restaurantComplete,
                    deliverySlot: order.orderTime.deliverySlot,
                },
                price: {
                    food: order.price.food,
                    delivery: order.price.delivery,
                    tip: order.price.tip,
                },
                food: order.food,
            }
        })

        setDriverOrderInfo(orderInfo)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await getOrders(sortType, page, size);
                console.log(request);
                setOrders(request.data)
                setDriverOrderInfoHelper(request.data);
                return request;
            }
            catch (err) {
                // history.push("/orders");

            }
        }
        fetchData();
    }, [sortType, page, size]);

    const handleSortChange = (event) => {
        setSortType(event.target.value);
    }

    const handleSizeChange = (event) => {
        console.log(event.target.value);
        console.log(event.target.page);
        setSize(event.target.value);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page !== 1) {
            setPage(page - 1);
        }
    }

    const formatTime = (time) => {
        if (time == null) {
            return null;
        }
        let parts = time.slice(0, -1).split('T');
        // let dateComponent = parts[0];
        let timeComponent = parts[1];
        return timeComponent.toString().substring(0, 5);
    }


    console.log(orders);

    const handleAccept = async (id) => {
        await assignOrder(parseInt(id), currentDriver.id);
        history.push("/home");
    }

    const orderList = driverOrderInfo.map((order) =>
        <Container key={order.id}>
            <Row className={"headerRow"}>
                <Col>{order.id}</Col>
                <Col>{order.address}</Col>
                <Col>{formatTime(order.orderTime.restaurantComplete)}</Col>
                <Col>{formatTime(order.orderTime.deliverySlot)}</Col>
                <Col>{order.price.tip}</Col>
                <Col><Button onClick={() => handleAccept(order.id)}>Accept</Button></Col>
            </Row>
        </Container>);


    return (
        <div className={"container"}>
            <div className={"spanDiv"}>
                <select
                    name="sortSelect"
                    id="sortSelect"
                    className="form-select form-select-sm"
                    onChange={handleSortChange}>
                    <option value="time">Time</option>
                    <option value="distance">Distance</option>
                    <option value="price">Tip Price</option>
                </select>
                <span className={"d-flex align-items-center px-1 fs-5 float-end"}>Sort:</span>

            </div>
            <div className={"list"}>
                <Container key={0} className={"header"}>
                    <Row className={"rowItem"}>
                        <Col>Id</Col>
                        <Col>Address</Col>
                        <Col>Pick-up Time</Col>
                        <Col>Drop-off Time</Col>
                        <Col>Tip</Col>
                        <Col>Select</Col>
                    </Row>
                </Container>
                <hr
                    style={{
                        color: "black",
                        backgroundColor: "black",
                        height: 2
                    }}
                />
                {orderList}</div>
            <div className="d-flex justify-content-center p-3">
                <button className="btn btn-secondary" onClick={prevPage}>Prev</button>
                <span className="d-flex align-items-center px-2">{page}</span>
                <button className="btn btn-secondary" onClick={nextPage}>Next</button>
                <select
                    name="pageSize"
                    id="pageSizeSelect"
                    className="form-select form-select-sm mx-2"
                    onChange={handleSizeChange}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
}

export default DisplayOrdersPage;