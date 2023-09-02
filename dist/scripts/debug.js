import clients from 'index.js';
function main() {
    clients.shopify.summarize('https://sietefoods.com').then((response) => {
        console.log(response);
    });
}
main();
//# sourceMappingURL=debug.js.map