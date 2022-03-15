import React, { useState } from 'react';
import './Numbers.scss';
import { theme } from '../config';
import { Container, Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSpring, animated, useTrail } from 'react-spring';
import { Waypoint } from 'react-waypoint';
import {
    getTotalBirdsStaked,
    getTotalDirtMinted,
    getTotalWormsStaked,
} from '../backend/createNFT';

const config = { mass: 1, tension: 200, friction: 150 };

function ListAnimated(props: any) {
    const [visable, setVisable] = useState(false);
    const trail = useTrail(props.items.length, {
        config,
        opacity: 1,
        x: 0,
        height: 80,
        from: { opacity: 0, x: 400, height: 0 },
    });
    return (
        <>
            <Waypoint
                onEnter={() => {
                    setVisable(true);
                }}
            />
            {visable ? (
                <ul>
                    {trail.map(({ x, height, ...rest }, index) => (
                        <animated.div
                            className="list"
                            key={props.items[index]}
                            style={{
                                ...rest,
                                transform: x.interpolate(
                                    (x) => `translate3d(0,${x}px,0)`
                                ),
                            }}
                        >
                            <animated.li className="feedRow" style={{ height }}>
                                {props.items[index]}
                            </animated.li>
                        </animated.div>
                    ))}
                </ul>
            ) : null}
        </>
    );
}

function StatsRow(props: { category: string; amount: number }) {
    const { number } = useSpring({
        reset: true,
        from: { number: 0 },
        number: props.amount,
        delay: 200,
        config: { mass: 1, tension: 170, friction: 50 },
    });
    const [visable, setVisable] = useState(false);
    return (
        <>
            <Waypoint
                onEnter={() => {
                    setVisable(true);
                }}
            />
            {visable ? (
                <ListGroupItem className="statsRow">
                    <h2>{props.category}: </h2>
                    <animated.div>
                        {number.to((n) => n.toFixed(0))}
                    </animated.div>
                </ListGroupItem>
            ) : null}
        </>
    );
}

function LeaderRow(props: { account: string; amount: number; action: string }) {
    const { number } = useSpring({
        reset: true,
        from: { number: 0 },
        number: props.amount,
        delay: 200,
        config: { mass: 1, tension: 170, friction: 50 },
    });
    const [visable, setVisable] = useState(false);
    return (
        <>
            <Waypoint
                onEnter={() => {
                    setVisable(true);
                }}
            />
            {visable ? (
                <ListGroupItem className="leaderBoardPersonRow">
                    <h3>{props.account}: </h3>
                    <span>{props.action}</span>
                    <animated.span>
                        {number.to((n) => n.toFixed(0))}
                    </animated.span>
                </ListGroupItem>
            ) : null}
        </>
    );
}
class Numbers extends React.Component<
    {},
    {
        mintAmount: number;
        totalDirt: number;
        totalWormsStaked: number;
        totalBirdsStaked: number;
    }
> {
    constructor(props: any) {
        super(props);
        this.adjustMintAmount = this.adjustMintAmount.bind(this);
        this.state = {
            mintAmount: 0,
            totalDirt: 0,
            totalBirdsStaked: 0,
            totalWormsStaked: 0,
        };
    }

    async componentDidMount() {
        const totalDirt = await getTotalDirtMinted();
        const totalBirdsStaked = await getTotalBirdsStaked();
        const totalWormsStaked = await getTotalWormsStaked();
        this.setState({
            totalDirt: parseInt(totalDirt),
            totalBirdsStaked: parseInt(totalBirdsStaked),
            totalWormsStaked: parseInt(totalWormsStaked),
        });
    }

    feedClick(e: any) {
        console.log(e.target.dataset.link);
    }

    adjustMintAmount(amount: number) {
        this.setState((prevState) => ({
            mintAmount: prevState.mintAmount + amount,
        }));
    }

    render() {
        const feedElements = ['teddy stole', 'scott minted', 'cammy minted'];
        const feedListItems = [];
        for (const [index, value] of feedElements.entries()) {
            feedListItems.push(
                <li
                    key={index}
                    onClick={this.feedClick}
                    className="feedRow"
                    data-link={value}
                >
                    {value}
                </li>
            );
        }

        return (
            <>
                <Container className="numbersContainer">
                    <Row>
                        <h1>Numbers</h1>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h2>Stats</h2>
                            </Row>
                            <Row>
                                <ListGroup className="list">
                                    <StatsRow
                                        category={theme.currency}
                                        amount={this.state.totalDirt}
                                    ></StatsRow>
                                    <StatsRow
                                        category={theme.alphaToken}
                                        amount={this.state.totalBirdsStaked}
                                    ></StatsRow>
                                    <StatsRow
                                        category={theme.betaToken}
                                        amount={this.state.totalWormsStaked}
                                    ></StatsRow>
                                </ListGroup>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h2>Leaderboard</h2>
                            </Row>
                            <Row>
                                <ListGroup className="list">
                                    <ListGroupItem className="leaderBoardRow">
                                        <ListGroup>
                                            <h2>Top Stakers</h2>
                                            <LeaderRow
                                                account={'1. Teddy'}
                                                amount={1231}
                                                action={'Staked'}
                                            ></LeaderRow>
                                            <LeaderRow
                                                account={'2. Cammy'}
                                                amount={121}
                                                action={'Staked'}
                                            ></LeaderRow>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem className="leaderBoardRow">
                                        <ListGroup>
                                            <h2>Top Birds</h2>
                                            <LeaderRow
                                                account={'1. Teddy'}
                                                amount={1231}
                                                action={'Birds'}
                                            ></LeaderRow>
                                            <LeaderRow
                                                account={'2. Cammy'}
                                                amount={121}
                                                action={'Birds'}
                                            ></LeaderRow>
                                        </ListGroup>
                                    </ListGroupItem>
                                    <ListGroupItem className="leaderBoardRow">
                                        <ListGroup>
                                            <h2>Top Dirt</h2>
                                            <LeaderRow
                                                account={'1. Teddy'}
                                                amount={1231}
                                                action={'Dirt'}
                                            ></LeaderRow>
                                            <LeaderRow
                                                account={'2. Cammy'}
                                                amount={121}
                                                action={'Dirt'}
                                            ></LeaderRow>
                                        </ListGroup>
                                    </ListGroupItem>
                                </ListGroup>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h2>Live</h2>
                            </Row>
                            <ListAnimated items={feedElements} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Numbers;
