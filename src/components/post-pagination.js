import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class PostPagination extends Component{
    constructor(props){
        super(props);
        //this.displayPaginationLink = this.displayPaginationLink.bind(this);
        this.state = {
            headers: [],
            activePage: 1,
            activeUrl: 'blog'
        }

    }
    componentDidUpdate(prevProps, prevState){
        if (prevProps.activePage !== this.props.activePage) {
            this.setState({
                headers: this.props.headers,
                activePage: this.props.activePage,
                activeUrl:this.props.activeUrl
            });
        }
    }

    componentDidMount(){
        this.setState({
            headers: this.props.headers,
            activePage: this.props.activePage,
            activeUrl:this.props.activeUrl
        });
        
    }

    render(){
        const { headers,activePage,activeUrl } = this.state;
        console.log(this.state);
        let pagination = [];
        let pageIndex = 0;
        let numberPages = headers['x-wp-totalpages'];
        
        let currentPage = parseInt(activePage);
        if(currentPage > 2 ){
            pagination[pageIndex] = <li className="page-item" key={pageIndex}>
            <Link className="page-link" to={`/${activeUrl}/page/1`}>First</Link>
            </li>;
            pageIndex++;
        }
        if(currentPage > 1 ){
            let prevPage = parseInt(currentPage) - 1;
            pagination[pageIndex] = <li className="page-item" key={pageIndex}>
            <Link className="page-link" to={`/${activeUrl}/page/${prevPage}`}>Previous</Link>
            </li>;
            pageIndex++;
        } else {
            pagination[pageIndex] = <li className="page-item disabled" key={pageIndex}>
            <span className="page-link">Previous</span>
            </li>;
            pageIndex++;
        }
        if(numberPages <= 5 ){
            
            for(let page = 1; page <= numberPages; page++){
                pagination[pageIndex] = <li className={(page === currentPage) ? 'page-item active' : 'page-item'} key={pageIndex}>
                <Link className="page-link" to={`/${activeUrl}/page/${page}`}>{page}</Link>
                </li>;
                pageIndex++;
            }
        }
        if(numberPages > 5 ){
            let counter = 0;
            let startPageRange = (numberPages - currentPage ) > 5 ? currentPage : numberPages-5;
            let pageRange = parseInt(currentPage)+5 > numberPages ? numberPages : parseInt(currentPage)+5;
            
            for(let page = startPageRange; page <= pageRange; page++){
                if( counter === 2 && pageRange > 5){
                    pagination[pageIndex] =<li className="page-item disabled" key={pageIndex}>
                    <span className="page-link">...</span>
                    </li>;
                    pageIndex++;
                } else {
                    pagination[pageIndex] = <li className={(page === currentPage) ? 'page-item active' : 'page-item'} key={pageIndex}>
                    <Link className="page-link" to={`/${activeUrl}/page/${page}`}>{page}</Link>
                    </li>;
                    pageIndex++;
                }
                counter++;
            }

            
        }
        if(currentPage < numberPages ){
            let nextPage = parseInt(currentPage) + 1;
            pagination[pageIndex] = <li className="page-item" key={pageIndex}>
            <Link className="page-link" to={`/${activeUrl}/page/${nextPage}`}>Next</Link>
            </li>;
            pageIndex++;
        }else{
            pagination[pageIndex] = <li className="page-item disabled" key={pageIndex}>
            <span className="page-link">Next</span>
            </li>;
            pageIndex++;
        }
        if(currentPage < numberPages && numberPages >= 5 ){
            pagination[pageIndex] = <li className="page-item" key={pageIndex}>
            <Link className="page-link" to={`/${activeUrl}/page/${numberPages}`}>Last</Link>
            </li>;
            pageIndex++;
        }
        return(
            
            <nav>
            { this.state.headers['x-wp-totalpages'] > 1 &&
                <ul className="pagination justify-content-center">
                    { pagination }
                </ul>
            }
            </nav>
        )
    }
}

export default PostPagination;