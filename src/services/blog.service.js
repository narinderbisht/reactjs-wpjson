import http from '../http-common';

class BlogDataService{
    getCategoryList(){
        return http.get('/wp/v2/categories');
    }
    getCategoryDetail(slug){
        return http.get(`/wp/v2/categories?slug=${slug}`);
    }
    getCategoryPosts(cat_id,page){
        return http.get(`/wp/v2/posts?categories=${cat_id}&per_page=2&page=${page}`);
    }
    getPostList(page){
       return http.get(`/wp/v2/posts/?per_page=2&page=${page}`);
    }
    getPostDetail(slug){
        console.log(slug);
        return http.get(`/wp/v2/posts/?slug=${slug}`);
    }
    getPostFeaturedImage(id){
        return http.get(`/wp/v2/media/${id}`);
    }
    getPostCategoryName(id){
        return http.get(`/wp/v2/categories/${id}`)
    }
    
}
export default new BlogDataService();