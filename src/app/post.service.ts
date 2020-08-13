import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';
import { HttpClient } from '@angular/common/http';

//const perPage = Number.MAX_SAFE_INTEGER;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page, tag, category): Observable<BlogPost[]> {
    const perPage = 6;
    
    let params = {
      page: page,
      perPage: perPage.toString()
    }

    if(tag){
      params["tag"] = tag;
    }

    if(category){
      params["category"] = category;
    }
    
    return this.http.get<BlogPost[]>(`https://warm-wildwood-96282.herokuapp.com/api/posts`, {params});
  }

  getPostById(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://warm-wildwood-96282.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`https://warm-wildwood-96282.herokuapp.com/api/categories`);
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>(`https://warm-wildwood-96282.herokuapp.com/api/tags`)
  }

  getAllPosts(): Observable<BlogPost[]> {
    const perPage = Number.MAX_SAFE_INTEGER.toString();

    let params = {
      page: "1",
      perPage: perPage
    }
    
    return this.http.get<BlogPost[]>(`https://warm-wildwood-96282.herokuapp.com/api/posts`, {params});
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://warm-wildwood-96282.herokuapp.com/api/posts`, data);
  }

  updatePostByID(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://warm-wildwood-96282.herokuapp.com/api/posts/${id}`, data)
  }

  deletePostByID(id: string): Observable<any> {
    return this.http.delete<any>(`https://warm-wildwood-96282.herokuapp.com/api/posts/${id}`);
  }
}
