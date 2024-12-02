

import axios from "axios";


const productionUrlStrapi = " https://strapi-store-server.onrender.com/api";

export const customFetchStrapi = axios.create({
  baseURL: productionUrlStrapi,
});


const productionUrlHF = " https://ikea-api.p.rapidapi.com";
export const customFetchHF = axios.create({
  baseURL: productionUrlHF,

  headers: {
    // "x-rapidapi-key": "765521f256mshc2545f8ffb3774cp1cde5ajsnc0b3ad22f4b6",
    "x-rapidapi-key": `${import.meta.env.VITE_API_KEY}`,
    "x-rapidapi-host": "ikea-api.p.rapidapi.com",
  },
});

export const formatPrice = (price) => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};

// async function scrapeData(listColors) {
//   try {
//     const response = await fetch(url, {
//       // cache: "no-store",
//       method: "GET",
//       headers: {
//         "User-Agent":
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
//         "Accept-Language": "en-US,en;q=0.9",
//         "Accept-Encoding": "gzip, deflate, br",
//         Accept:
//           "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
//         Connection: "keep-alive",
//       },
//     });
//     const html = await response.text();
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");
//     console.log("doc: ", doc);
//     const desc = doc.getElementsByClassName(
//       "pip-product-summary__description"
//     )[0];
//     const desc_try = desc.textContent;
//     console.log("desc_try: ", desc_try);
//     const colors = doc.getElementsByClassName("pip-image");
//     for (let i = 0; i < colors.length; i++) {
//       let colorSrc = colors[i].getAttribute("src");
//       let color = colorSrc.split("__")[0].split("-").slice(-1);
//       console.log("color: ", color);
//       listColors.push(color);
//     }
//     setDescript(desc_try);
//     setProductsColor(listColors);
//   } catch (error) {
//     console.log(error);
//   }
// }

// useEffect(() => {
//   scrapeData();
// }, []);
