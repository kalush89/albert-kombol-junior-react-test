import { Client, Query } from '@tilework/opus';


    const defaultEndpoint = process.env.GRAPHQL_ENDPOINT;
    export const client = new Client(defaultEndpoint, {
        headers: {
          authorization: `Bearer ${defaultEndpoint}`,
        }
      });

      client.setEndpoint('http://localhost:4000/');

      export const getCategories = async() => {
        const categoryFields = ['name'];

        const query = new Query('categories', true)
        .addFieldList(categoryFields)

        const result = await client.post(query);

        return result;
      }

      export const getCategoryDetails = async(category) => {
        const categoryFields = ['name', 'products {id, name, inStock, gallery, description, attributes{id, name, type, items{ displayValue, value, id}}, prices{currency{label, symbol}, amount}, brand}'];
    
        const query = new Query('category', true)
        .addArgument('input', 'CategoryInput', {title:category} )
        .addFieldList(categoryFields)

        const result = await client.post(query);

        return result;
      }


      export const getCurrencies = async() => {
        const currencyFields = ['label, symbol'];

        const query = new Query('currencies', true)
        .addFieldList(currencyFields)

        const result = await client.post(query);

        return result;
      }

      