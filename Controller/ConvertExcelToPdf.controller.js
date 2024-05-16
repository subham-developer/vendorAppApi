
import ExcelJs from "exceljs";
import PDFDocument from "pdfkit";
import fs from "fs";
// https://www.npmjs.com/package/pdfkit-table

export const ConvertExcelToPDF = async(req, res) => {
    console.log('req', req);
    const workbook = new ExcelJs.Workbook();
    // testingExcelToPdf.xlsx
    // TestingExcelToPdf2.xlsx
    await workbook.xlsx.readFile("TestingExcelToPdf2.xlsx");
    const worksheet = workbook.getWorksheet("Sheet1");
    // console.log(worksheet)

    const pdfDoc = new PDFDocument({
        // size: [50000,50000],
    //  margins : { // by default, all are 72
    //      top: 72, 
    //      bottom: 72,
    //      left: 72,
    //      right: 72
    //  },
     layout: 'portrait', // can be 'landscape' 'portrait'
     info: {
         Title: 'title', 
         Author: 'author', // the name of the author
         Subject: '', // the subject of the document
         Keywords: 'pdf;javascript', // keywords associated with the document
        //  CreationDate: 'DD/MM/YYYY', // the date the document was created (added automatically by PDFKit)
        //  ModDate: 'DD/MM/YYYY' // the date the document was last modified
     }
    });
    // pdfDoc.size=[50000,50000]; 

    pdfDoc.pipe(fs.createWriteStream('chart.pdf'))

    const columnSpacing = 100
    var j = 0;
    const rowCount = worksheet.actualRowCount;
    const columnCount = worksheet.actualColumnCount;
    const totalPage = Math.round(rowCount / 14);
    let startRows = 1;
    let totalRows = 14;
    console.log('totalPage', totalPage);
    let y = 1;
    // worksheet.j
    // console.log('rowCount', rowCount);

    for(let i=1; i<=totalPage; i++){
        worksheet.eachRow((row,rowIndex)=>{
            console.log('rowIndex',rowIndex)
            if(startRows < totalRows){
                row.eachCell((cell,colIndex)=>{
                    const xPos = colIndex * 40 + (colIndex -1) * columnSpacing
                    const yPos = rowIndex * 40
                    var data = worksheet.getRow(startRows).getCell(colIndex).toString();
                    pdfDoc.text(data, xPos, yPos)
                    // console.log('xPos', xPos)
                    // console.log('yPos', yPos)
                })
            }
            startRows += 1
            // startRows = totalRows;
            // totalRows = (rowCount/totalPage)*i;
                // pdfDoc.addPage();
        })
        startRows = totalRows;
        totalRows = totalRows + 14;
        pdfDoc.addPage();
    }
    
    
    // while(y < totalPage){
    //     let position = 1;
    //     console.log('startRows',startRows, 'totalRows', totalRows)
    //     for(let i=startRows; i<=totalRows; i++){
    //         // if(i < 14){
    //             for (var j = 1; j <= columnCount; j++) {
    //                 var data = worksheet.getRow(i).getCell(j).toString();
    //                 // process.stdout.write(data+" ");
    //                 let xPos = j * 20 + (j -1) * columnSpacing
    //                 let yPos = startRows * 20
                    
    //                 // if(i > 15){
    //                 //     pdfDoc.addPage();
    //                 // }
    //                 pdfDoc.text(data, xPos, yPos)
                    
    //                 // position = position + 20 * y;
    //                 // y++;
    
    //                 // position = 20
    //                 // console.log('xPos',xPos)
    //                 // console.log('yPos', yPos)
                    
    //                 // pdfDoc.addPage()
    
    //                 // if (position > 740) {
    //                 //     pdf.addPage();
    //                 //     y = 0;
    //                 //   }
    //             }
                
    //         // }
    //     }
        
    //     y += 1;
    //     startRows = totalRows;
    //     totalRows = totalRows + 14;
    //     // console.log(y, startRows, totalRows);
    //     pdfDoc.addPage();
    //     position = 1;
    // }
    

    
    

    pdfDoc.end()
}