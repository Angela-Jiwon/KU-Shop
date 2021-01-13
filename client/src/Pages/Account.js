import React, { useEffect, useState } from 'react'
import { Card, Image, Container, Row, Col, Table, Accordion, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import person from '../person.svg';
import mypagetiger from '../mypagetiger.svg';
import axios from 'axios'
import catchErrors from '../utils/catchErrors';
import { isAuthenticated } from '../utils/auth';

const INIT_ACCOUNT = {
    name: "",
    tel: ""
}

function Account() {
    const [account, setAccount] = useState(INIT_ACCOUNT)
    const [error, setError] = useState("")

    const userId = isAuthenticated()


    async function getUsername(user) {
        try {
            const response = await axios.get(`/api/users/account/${user}`)
            setAccount(response.data)
            console.log('555555555', response.data);
        } catch (error) {
            catchErrors(error, setError)
            console.log('error2222', error)
        }
    }

    useEffect(() => {
        getUsername(userId)
    }, [userId])


    // const [account, setAccount] = useState(INIT_ACCOUNT)
    // const [error, setError] = useState("")


    // const user = isAuthenticated()


    // async function getAccount(user) {
    //     console.log(user);
    //     try {
    //         const response = await axios.get("/api/auth/login")
    //         setAccount(response.data)
    //         console.log(response.data);
    //     } catch (error) {
    //         catchErrors(error, setError)
    //     }
    // }
    // useEffect(() => {
    //     getAccount(user)
    // }, [user])


    return (


        <Container className="px-3">
            <h3 className="my-4 mx-3 font-weight-bold">My Page</h3>
            <Card md={3} className="p-1 mb-4" style={{ background: '#F7F3F3' }}>

                <Row className="p-2">
                    <Col md={4} className="d-flex align-content-center justify-content-center">
                        <Button type="button" variant="outline-light">
                            <Image src={person} roundedCircle className="img-thumbnail" width={"170rem"} />
                        </Button>
                    </Col>
                    <Col >
                        <Row className="mt-4 text-center">
                            <Col>
                                <h2>
                                    <strong>{account.name}</strong> <small>({account.id}){" "}님</small>
                                </h2>
                            </Col>
                        </Row>
                        <Row className="px-3">
                            <Card.Body className="p-2 text-center">
                                <h4><Link to="/" class="link-warning">
                                    <strong title="홈으로">
                                        <Image src={mypagetiger} width={"30rem"} roundedCircle className="img-thumbnail" >
                                        </Image>KU#
                  </strong>
                                </Link>
                                    {/* 홈페이지로 돌아가기 */}
                를 방문해주신 <em>{account.name}</em> 님,<br></br>
                진심으로 환영합니다! 즐거운 쇼핑 되세요.</h4>
                            </Card.Body>
                        </Row>
                        <Row className="mr-1 text-muted d-flex justify-content-end">
                            <a href="mailto:shoppingmall_KU@korea.ac.kr">
                                <small title="메일보내기"> * 문의 : shoppingmall_KU@korea.ac.kr </small>
                            </a>
                            {/* 쇼핑몰 문의 메일보내기 */}
                        </Row>
                    </Col>
                </Row>
            </Card>
            <Accordion>
                <Row className="my-3 px-3">
                    <Table>
                        <thead className="text-center" style={{ background: '#F7F3F3' }}>
                            <tr>
                                <th scope="col">주문현황</th>
                                <th scope="col">배송중</th>
                                <th scope="col">배송완료</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">케이시앵글부츠(SH)</th>
                                <td>Mark</td>
                                <td>Otto</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Accordion>

        </Container >

    )

}



export default Account
