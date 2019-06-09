import {Response, Request, Router} from 'express';
import Post from '../models/Post'

class PostRoutes {
   router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await Post.find();
        res.json(posts);
    }

    async getPost(req: Request, res: Response): Promise<void>  {
        const post = await Post.findOne({url: req.params.url});
        res.json(post);
    }
    async createPost(req: Request, res: Response): Promise<void>  {
        // console.log(req.body);
        const {title, url,  content, image} = req.body;
        const newPost = new Post({title, url, content, image});
        await newPost.save();
        console.log(newPost);
        
        res.json({data: newPost});
    }

    async deletePost(req: Request, res: Response): Promise<void>  {
        const {url} = req.params;
        const post = await Post.findOneAndDelete({url});
        res.json({response: 'Publicación eliminada'});
    }

    async updatePost(req: Request, res: Response): Promise<void>  {
        const {url} = req.params;
        const post = await Post.findOneAndUpdate({url}, req.body, {new: true});
        res.json(post);
        // Post.findOneAndUpdate 
    }

    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoutes =new PostRoutes();
export default postRoutes.router;