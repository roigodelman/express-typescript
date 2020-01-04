import {get, controller, use} from './decorators';
import {Request, Response, NextFunction} from 'express';


function  requireAuth(req: Request, res: Response, next: NextFunction) : void {
    if(req.session && req.session.loggedIn){
        next();
        return
    }

    res.status(403);
    res.send('Not permitted');
}


@controller('')
class RootController{

    @get('/')
    getRoot(req: Request, res: Response){
        if(req.session && req.session.loggedIn){
            res.send(`
                <div>
                    <div> you are log in</div>
                    <a href="/logout">Logout</a>
                </div>
            `);
        }
        else{
            res.send(`
                <div>
                    <div> you are not log in</div>
                    <a href="/login">Login</a>
                </div>
            `);
        }
    };


    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response){
        res.send('Welcome to protected router');
    };
    
}