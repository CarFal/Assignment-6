import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost} from '../BlogPost';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  blogPost: BlogPost;
  tags: string;
  private post;

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post = this.data.getPostById(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    })
  }

  onSubmit(): void {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.data.updatePostByID(this.blogPost._id, this.blogPost).subscribe( ()=> this.router.navigate(['/admin']));
  }

  deletePost(id) {
    this.data.deletePostByID(id).subscribe( ()=> this.router.navigate(['/admin']));
  }

  ngOnDestroy() {
    if(this.post){
      this.post.unsubscribe();
    }
  }

}
