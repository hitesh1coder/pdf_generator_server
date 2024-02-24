import Product from "../models/products.model.js";
import puppeteer from "puppeteer";

export const saveProducts = async (req, res) => {
  try {
    let { fullName, products } = req.body;

    if (!fullName && !email && products.length === 0)
      return res.status(400).json({
        status: "fail",
        message: "Please fill all the fields.",
      });
    const result = await Product.create({ fullName, products });

    if (!result)
      return res
        .status(400)
        .json({ status: "fail", message: "Error to save products" });

    res.status(201).json({
      status: "success",
      message: `Your product has been saved successfully!`,
    });
  } catch (err) {
    console.log("Error in saving the product: ", err);
    res.status(400).json({
      status: "fail",
      message: "Something went wrong while trying to save your product.",
    });
  }
};

export const getPdf = async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Adjust the viewport and navigate to the desired page
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(`${process.env.CLIENT_URL}`, {
      waitUntil: "networkidle0",
    });

    // Generate PDF
    const pdfBuffer = await page.pdf({ path: "outPut.pdf", format: "A4" });

    await browser.close();

    // Send the PDF as response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="page.pdf"');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};
