import {Response, Request, Router} from 'express';
import User from '../models/User'

class UserRoutes {
   router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    async getuser(req: Request, res: Response): Promise<void>  {
        const user = await User.findOne({username: req.params.username}).populate('posts');
        res.json(user);
    }
    async createUser(req: Request, res: Response): Promise<void>  {
        // console.log(req.body);
        // const {title, url,  content, image} = req.body;
        const newUser = new User(req.body);
        await newUser.save();
        console.log(newUser);
        
        res.json({data: newUser});
    }

    async deleteUser(req: Request, res: Response): Promise<void>  {
        const {username} = req.params;
        const user = await User.findOneAndDelete({username});
        res.json({response: 'Ususario eliminada'});
    }

    async updateUser(req: Request, res: Response): Promise<void>  {
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username}, req.body, {new: true});
        res.json(user);
        // Post.findOneAndUpdate 
    }

    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getuser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}
const userRoutes =new UserRoutes();
export default userRoutes.router;