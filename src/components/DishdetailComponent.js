import React from 'react';
import { Component } from 'react';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';
import {required, minLength, maxLength} from './ContactComponent';
import {Button, Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Modal, ModalHeader, ModalBody, ModalFooter, Row, Label, Col, FormGroup, Input} from 'reactstrap';

function DishDetailRender({dish, comments, addComment}){

    if(dish != null){
        return (
            <div className="container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12"><h3>Menu</h3><hr/></div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className="list-unstyled">
                            {
                                comments.map((comment) => {
                                    return (
                                        <li key={comment.id} className="mt-3">
                                            {comment.comment}<br/>
                                            -- {comment.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <CommentForm dishId={dish.id} addComment={addComment} /> 
                    </div>
                </div>
            </div>
        );
    }
    return(<div></div>);
}

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal () {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }
    
    handleSubmit (values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.userName, values.comment);
    }

    render () {
        return(
            <div>
                <Button className="btn btn-primary" onClick={this.toggleModal}>
                    <span><i class="fa fa-comment mr-2" aria-hidden="true"></i></span>
                    Submit Comment
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <Row className="form-group">
                                <Label htmlFor="rating"  sm={12}>Rating</Label>
                                <Col>
                                    <Control.select className="form-control" model=".rating" 
                                    name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="username" sm={12}>Your Name</Label>
                                <Col>
                                    <Control.text className="form-control" model=".userName"
                                    name="username" id="username" placeholder="your name"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(13)
                                    }}/> 
                                    <Errors model=".userName" className="text-danger"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be 2 characters at least',
                                        maxLength: 'Must be 15 characters at most'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" sm={12}>Comment</Label>
                                <Col>
                                    <Control.textarea className="form-control" model=".comment" name="comment" id="comment" placeholder="Write your comment" rows="6"/>
                                </Col>
                            </Row>
                            <Button type="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}){
    return(
        <Card>
            <CardImg width="100%" src = {dish.image} alt={dish.name}></CardImg>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}


export default DishDetailRender;