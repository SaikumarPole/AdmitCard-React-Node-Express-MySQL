import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Registered.css';
import { useParams } from 'react-router-dom';

function Registered() {
    
        // get the id from URL params
        const { id } = useParams();
        
        // set initial state for admit card
        const [admitCard, setAdmitCard] = useState({
            name: '',
            phone: '',
            school: '',
            classNum: '',
            rollNum: '',
            address: '',
        });

        // fetch the admit card data from the server
        useEffect(() => {
            fetch(`http://localhost:3000/api/get/${id}`)
            .then((response) => {
                if (response.ok) {
                return response.json();
                } else {
                throw new Error('Failed to fetch admit card');
                }
            })
            .then((data) => {
                // update the state with fetched data
                setAdmitCard({
                'name': data.name,
                'phone': data.phone,
                'school': data.school,
                'classNum': data.classNum,
                'rollNum': data.rollNum,
                'address': data.address,
                });
            })
            .catch((error) => console.error(error));
        }, [id]);

        // function to generate PDF
        const generatePDF = () => {
            // create a new jspdf instance
            const doc = new jsPDF('p', 'pt');

            // add overall border to the document
            doc.rect(30, 30, 550, 750);

            // add title to the document
            doc.setFontSize(20);
            doc.text('Admit Card 2023-2024', 290, 80, 'center');

            // add data to the table
            const tableData = [
            ['Name', admitCard.name],
            ['Phone', admitCard.phone],
            ['School', admitCard.school],
            ['Class', admitCard.classNum],
            ['Roll Number', admitCard.rollNum],
            ['Address', admitCard.address],
            ];

            // add light border to the table
            doc.autoTable({
            startY: 120,
            endX: 300,
            head: [['', 'Student details']],
            body: tableData,
            theme: 'grid',
            columnStyles: {
                0: { fontStyle: 'bold', halign: 'left' },
            },
            styles: {
                cellPadding: 5,
                fontSize: 14,
                lineWidth: 1,
                valign: 'middle',
                overflow: 'linebreak',
                cellWidth: 'auto',
            },
            didDrawCell: (data) => {
                if (data.section === 'body' && data.row.index % 2 === 0) {
                data.cell.styles.fillColor = '#f5f5f5';
                }
            },
            });

            // save the document
            doc.save('AdmitCard.pdf');
        };

        return (
            <div >
                <h2>Registration completed</h2>
                <br />
                
                <div className='admit-card'>
                <h4 className='center' >Admit Card 2023-2024</h4>
                    <table >
                        <tbody>
                            <tr>
                                <th>Name:</th>
                                <td>{admitCard.name}</td>
                            </tr>
                            <tr>
                                <th>Phone:</th>
                                <td>{admitCard.phone}</td>
                            </tr>
                            <tr>
                                <th>School:</th>
                                <td>{admitCard.school}</td>
                            </tr>
                            <tr>
                                <th>Class:</th>
                                <td>{admitCard.classNum}</td>
                            </tr>
                            <tr>
                                <th>Roll Number:</th>
                                <td>{admitCard.rollNum}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{admitCard.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className="d-grid w-50 text-center mx-auto my-5">
                    <button type="submit" onClick={generatePDF} className="btn btn-primary">
                        Download Admit Card
                    </button>
                </div>

            </div>
        )
    
}



export default Registered;
