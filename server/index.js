import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/getUser', async (req, res) => {
    const { battleTag } = req.query;
    const _fetch = await fetch(`https://playoverwatch.com/pt-br/career/pc/${battleTag}/`);
    const _html = await _fetch.text();
    const root = parse(_html);

    const linkPortrait = root.querySelector('.masthead-player img').rawAttributes.src;
    const [tank, damage, support] = root.querySelectorAll('.competitive-rank .competitive-rank-role .competitive-rank-section .competitive-rank-level');
    const competitiveRanks = [tank, damage, support];
    const ranks = [];
    competitiveRanks.forEach((e) => {
        console.log(e.innerText);
        // if(e.childNodes)
    })

    const result = {
        ok: true,
        linkPortrait
    };
    res.send(result)
});

app.get('/getNames', async (req, res) => {
    const { name } = req.query;
    const _fetch = await fetch(`https://playoverwatch.com/pt-br/search/account-by-name/${name}/`);
    const _res = await _fetch.json();
    res.send(_res);
});

app.get('/getPortraits', async (req, res) => {
    const _res = await fetch(`https://playoverwatch.com/en-us/search/`);
    const _resJson = await _res.text();
    const match = _resJson.split('<script>window.app.search.init(')[1].split(');\n</script>')[0];
    res.send(match);
});

app.listen(3001, () => console.log('Server running on port 3001.'));