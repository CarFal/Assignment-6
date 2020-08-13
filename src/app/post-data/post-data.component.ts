import { Component, OnInit, Input } from '@angular/core';
//import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  commentName: string;
  commentText: string;
  post: BlogPost;
  private querySub: any;

  constructor(private route: ActivatedRoute, private data: PostService) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      this.data.getPostById(params['id']).subscribe(data => {
        this.post = data,
        this.post.views++,
        this.data.updatePostByID(this.post._id, this.post).subscribe();
      });
     })
  }

  submitComment(): void {
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });
    this.data.updatePostByID(this.post._id, this.post).subscribe( ()=> {
      this.commentName = '';
      this.commentText = '';
    })
  }

  ngOnDestroy() {
    if(this.querySub) this.querySub.unsubscribe();
  }

}
