export const generalEmailTemplate = ({
  title,
  paragraphs,
  buttonText,
  buttonLink,
}: {
  title: string;
  paragraphs: string[];
  buttonText?: string;
  buttonLink?: string;
}): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            background-color: #3A2B18;
            color: white;
            text-align: center;
            border-radius: 5px 5px 0 0;
            padding: 10px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
          }
          .content {
            padding: 20px;
            margin-top: 20px;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 15px;
            color: white;
            background-color: #3A2B18;
            text-decoration: none;
            border-radius: 5px;
          }
            a  {
              text-decoration: none;
              color: white;
              }
          p {
            margin: 10px 0;
            font-size: small;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${title}</h1>
          </div>
          <div class="content">
            ${paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
            ${
              buttonText && buttonLink
                ? `<div class="button-container">
                    <a href="${buttonLink}" class="button">${buttonText}</a>
                   </div>`
                : ""
            }
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Wearical. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
