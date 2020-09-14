import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb} from 'reactstrap';

function DishDetailRender({dish, comments}){

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
                    </div>
                </div>
            </div>
        );
    }
    return(<div></div>);
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