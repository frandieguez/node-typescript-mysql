import { Router, Request, Response } from 'express';
import DbWrapper from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, resp: Response) => {

    const query = `
        SELECT *
        FROM heroes;
    `;

    DbWrapper.executeQuery(query, (err:any, heroes: Object[]) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                err
            })
        } else {

            resp.json({
                ok: true,
                heroes
            })

        }
    })
})

router.get('/heroes/:id', (req: Request, resp: Response) => {

    const escapedId = DbWrapper.instance.cnn.escape(req.params.id);

    const query = `
        SELECT *
        FROM heroes
        WHERE id= ${ escapedId };
    `;

    DbWrapper.executeQuery(query, (err:any, heroe: Object[]) => {
        if (err) {
            resp.status(400).json({
                ok: false,
                err
            })
        } else {

            resp.json({
                ok: true,
                heroe: heroe.pop()
            })

        }
    })
});

export default router;