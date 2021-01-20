import React, { useState } from 'react';
import axios from 'axios'
import { Form, Col, Container, Button, Row, Alert } from 'react-bootstrap'
import catchErrors from '../utils/catchErrors'
import { Redirect } from 'react-router-dom';

const INIT_USER = {
    name: '',
    number: '',
    id: '',
    password: '',
    password2: '',
    tel: '',
    email: ''
}

function Signup() {
    const [user, setUser] = useState(INIT_USER)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [validated, setValidated] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        console.log(user)

        try {
            setError('')
            const response = await axios.post('/api/users/signup', user)
            console.log(response.data)
            setSuccess(true)
        } catch (error) {
            catchErrors(error, setError)
        }
    }

    function checkPassword(event) {
        const p1 = user.password
        const p2 = user.password2

        if (p1 !== p2) {
            event.preventDefault();
            event.stopPropagation();
            alert('비밀번호가 일치하지 않습니다.')
            return false

        } else {
            return true
        }
    }

    if (success) {
        alert('회원가입 되었습니다.')
        return <Redirect to='/login' />
    }

    return (
        <div>
            <Container className="my-5">

                <Row className="justify-content-center">
                    <Col md={6} xs={10} className="border" style={{ background: '#F7F3F3' }}>
                        <h2 className="text-center m-5">Sign Up</h2>
                        {error && <Alert variant='danger'>
                            {error}
                        </Alert>}
                        <Form
                            noValidate validated={validated}
                            onSubmit={handleSubmit}
                            className="p-4">
                            <Form.Group as={Col} controlId="formBasicName" className="justify-content-end">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="id">이 름</Col>
                                    <Col sm={8} xs={6} as={Form.Control}
                                        required type="text"
                                        name="name"
                                        placeholder="Name"
                                        style={{ width: '160px' }}
                                        value={user.name}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid" >이름을 입력하세요. </Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicNumber">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="number">주민등록번호</Col>
                                    <Col xs={3}>
                                        <Form.Control
                                            required type="text"
                                            name="number1"
                                            maxlength="6"
                                            className="ml-1 mr-3 p-1" style={{ width: '80px' }}
                                            value={user.number1}
                                            onChange={handleChange}>
                                        </Form.Control>
                                    </Col>
                                    <Col xs={1}>
                                        <div className='font-weight-bold d-flex align-items-center' style={{ text: 'center' }}>-</div>
                                    </Col>
                                    <Col xs={2}>
                                        <Form.Control
                                            required type="text"
                                            name="number2"
                                            maxlength="1" className="mx-3 p-1"
                                            style={{ width: '30px' }}
                                            value={user.number2}
                                            onChange={handleChange}>
                                        </Form.Control>
                                    </Col>
                                    <Col xs={2}>
                                        <div className='font-weight-bold d-flex align-items-center'>* * * * * * </div>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">주민등록번호를 입력하세요.</Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicId">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="id">아이디</Col>
                                    <Col sm={8} xs={12} as={Form.Control}
                                        required
                                        type="text"
                                        name="id"
                                        placeholder="ID"
                                        style={{ width: '160px' }}
                                        value={user.id}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid"> 아이디를 입력하세요.</Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="password">비밀번호</Col>
                                    <Col sm={8} xs={12} as={Form.Control}
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        style={{ width: '160px' }}
                                        value={user.password}
                                        required
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback className="text-end" type="invalid">
                                        비밀번호를 입력하세요.
                                    </Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword2">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="password">비밀번호 확인</Col>
                                    <Col sm={8} xs={12} as={Form.Control}
                                        type="password"
                                        name="password2"
                                        placeholder="Password"
                                        style={{ width: '160px' }}
                                        value={user.password2}
                                        required
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type="invalid"> 비밀번호를 한번 더 입력하세요.
                                    </Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="email">이메일</Col>
                                    <Col sm={8} xs={12} as={Form.Control}
                                        required type="email"
                                        name="email"
                                        placeholder="E-mail"
                                        style={{ width: '160px' }}
                                        value={user.email}
                                        onChange={handleChange} />
                                    <Form.Control.Feedback type="invalid"> 이메일 입력하세요. </Form.Control.Feedback>
                                </Form.Row>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicTel">
                                <Form.Row>
                                    <Col sm={4} xs={6} as={Form.Label} for="tel">휴대전화</Col>
                                    <Col sm={8} xs={12} style={{ width: '160px' }} className='p-0'>
                                        <Col
                                            as={Form.Control}
                                            required type="text"
                                            name="tel"
                                            placeholder="Telephone"
                                            className='p-1'
                                            value={user.tel}
                                            onChange={handleChange}>

                                        </Col>
                                        <div className='d-flex justify-content-end mt-1'><small >' - ' 를 함께 입력해주세요^^</small></div>
                                    </Col>
                                    <Form.Control.Feedback type="invalid"> 휴대전화를 입력하세요. </Form.Control.Feedback>
                                </Form.Row>
                                <Form.Control.Feedback className="text-end" type="invalid">
                                    비밀번호를 입력하세요.
                                    </Form.Control.Feedback>
                            </Form.Group >
                            <Button
                                style={{ background: '#91877F', borderColor: '#91877F' }} type="submit" block
                                onClick={checkPassword}
                            >
                                Sign Up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Signup