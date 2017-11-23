# at.express

Set of @decorators and classes to support TypeScript features:

* Express.Router as classes
* Support async/await functions
* Easy params/query/body picking with validation and conversion (e.g. string to Date)
* Swagger doc generator

## Example
```
@Path('/users')
class Users extends Controller {

    @Get('/:id')
    findById(@Params: params, @Inject userDB: UserDB): Promise<User> {
        return userDB.find(params.id);
    }

    @Before(Authentication) //pre-hook for middleware
    @Put('*')
    async editUser(@Body user: User, @Inject userDB: UserDB): Promise<User> {
        await userDB.update(user);
        return user;
    }

    @Post('/signin')
    async signin(@Body authData: AuthData, @Inject userDB: UserDB): Promise<boolean> {
        return userDB.authenticate(authData)
    }

}

class Authentication extends Middleware {

    async use(@Body authData: AuthData, @Inject ) {
        const authenticated = await checkUserAuth;

        if(!authenticated) {
            throw Error()
        }
    }

}

class UserDB {
    //some db stuff
}

const app = express();
app.use(require('body-parser').json());

API.route(app); //Swagger generator (attach before routes you want to document)
Users.route(app);   //equivalent of app.use('/user', express.router().get(...)...
```

## Controller (wrap for Express.Router)

#### methods

* router(app: Express.Application | Express.Router) - Mounts middleware

#### Controller decorators

* @Path(path: string) - router path
* @Use(ctrl: ControllerClass) - to nesting routes
* @Before/@After(...middlewares: MiddlewareClass[]) - to attach middleware

#### Methods decorators

* @Get/@Post/@Put/@Delete/@Head/@All(path: string) - router methods
* @Before/@After(...middlewares: MiddlewareClass[]) - to attach middleware
* @Use(ctrl: ControllerClass) - to nesting routes but wrapped with parent @Before/@After

express Request and Response is able as last two parameters of method

#### Params decorators

* @Body/@Params/@Query/@Cookie/@Session - shorthand for req.body/req.params/...
* @Inject - create new instance of service and share between middleware and controller
* @Error - to handle request errors (like router.use((err, req, res, next)=>{})

## Middleware
Express like middleware function with support of Controller's methods features. Usable with @After/@before or independently.

#### methods

* router(app: Express.Application | Express.Router) - Mounts middleware

```
class Authentication extends Middleware {

    //"use" is required method of every Middleware
    async use(@Body authData: AuthData, @Inject ) {
        const authenticated = await checkUserAuth;

        if(!authenticated) {
            throw Error()
        }
    }

}
```

## Predefined middleware and controllers

### ErrorMiddleware - to handle express exceptions

### APIController - to create swagger schema.json response