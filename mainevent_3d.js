/* 3D Interactive Event Viewer Project Written for GRAND EVENT NEUTRINO COLLABORATION, by:

                           SHIVAJI CHAULAGAIN
*/

//----------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const key = Object.keys(geodata[0]);
    const xValues = key.map(k => geodata[0][k]['X']);
    const yValues = key.map(k => geodata[0][k]['Y']);
    const zValues = key.map(k => geodata[0][k]['Z']);
    const plotElement = document.getElementById('plot');
    // create an initial 3D scatter plot of antenna geometry
    const traced = {
        x: xValues,
        y: yValues,
        z: zValues,
        mode: 'markers',
        marker: {
            size: 8,
            opacity: 1,//updatedData.map(point => point.opacity),
            color: 'rgba(128, 128, 128, 1)'
        },
        type: 'scatter3d'
    };
    const layout = {
        scene: {
            xaxis: {
                visible:false   
            },
            yaxis: {
                visible: false   
            },
            zaxis: {
                visible:false   
            }
        },
        width: 700,
        height: 630
    };
    Plotly.newPlot(plotElement,[traced], layout);

    // create an initial layout of shower and angular plane
    let plotelement_s = document.getElementById("showerplot");
    let plotelement_a = document.getElementById("angularplot");
    let plotelement_p = document.getElementById("peakplot");
    const peaklayout = {
        width: 450,
        height: 270,
        xaxis: {
            title: 'x_omega',
        },
        yaxis: {
            title: 'peak amp [\u03bcV/m]',
        },
    };
    const showerlayout = {
        width: 550,
        height: 270,
        title: 'Shower Plane',
        xaxis: {
            title: 'vxB [km]',
            showline: true,
            showticklabels: true,
            ticks: "outside",
        },
        yaxis: {
            title: 'vx(vxB) [km]',
            showticklabels: true,
            ticks: "outside",
        },
        hovermode: 'closest',
        font: {
            size: 10
        },
        margin: {
            t: 50,
            l: 50,
            r: 50,
            b: 50
        }
    };
    // layout for angular plane
    const angularlayout = {
        width: 550,
        height: 270,
        title: 'Angular Plane',
        xaxis: {
            title: 'vxB [km]',
        },
        yaxis: {
            title: '\u03c9 along vx(vxB) [deg]',
        },
    };

    // Create the plot with data and layout
    Plotly.newPlot(plotelement_p, [{x:[0], y:[0], mode: 'markers'}], peaklayout);
    Plotly.newPlot(plotelement_s, [{x:[0], y:[0], mode: 'markers'}], showerlayout);
    Plotly.newPlot(plotelement_a, [{x:[0], y:[0], mode: 'markers'}], angularlayout);

    // create a initial layout for Electrifield and hilbert Electric field traces
    function range(n){
        return Array.from({length:n+1}, (_,i) => i);
    };
    const t = range(3500);
    const Elayout = {
        title: {
            text:"<b>E-field traces</b>",
        },
        xaxis:{
            title: "Time",
            range: [0,3500],
            showline: true,
            showticklabels: true,
            dividerwidth:2,
            ticks: "outside",
            dtick:500,
            minorgridcount: 4
        },
        yaxis:{
            title: "E-field [\u03bcV/m]",
            showline: true,
            showticklabels: true,
            ticks: "outside"
        },
        width: 530,
        height: 250,
        zoomBehavior: 'both',
        showgrid: true
    };
    const hlayout = {
        title: {
            text: "Hilbert Envelope",
            font:{
                size: 12,
            }
        },
        xaxis:{
            title: "Time",
            range: [0,3500],
            showline: true,
            showticklabels: true,
            dividerwidth:2,
            ticks: "outside",
            dtick:500,
            minorgridcount: 4
        },
        yaxis:{
            title: "E-field [\u03bcV/m]",
            showline: true,
            showticklabels: true,
            ticks: "outside"
        },
        width: 530,
        height: 250,
        showgrid: true
    };
    // create an initial plot for table
    const val = [[
        "Particle",
        "Ene [EeV]",
        "Zen [deg]",
        "Azi [deg]",
        "Xmax [g/cm2]",
        "BInc [deg]",
        "BDec [deg]"
    ],[0,0,0,0,0,0,0]];
    var headerColor = "grey";
    var rowEvenColor = "lightgrey";
    var rowOddColor = "white";
    var data = [{
        type: 'table',
        columnorder: [1,2],
        columnwidth: [1,1],
        header: {
            values: [["<b>Quantity</b>"], ["<b>Values</b>"]],
            align: "center",
            height:20,
            line: {width: 1, color: 'black'},
            fill: {color: headerColor},
            font: {family: "Arial", size: 12, color: "white"}
        },
        cells: {
            values: val,
            align: "center",
            height: 20,
            line: {color: "black", width: 1},
            fill: {color: [[rowOddColor,rowEvenColor,rowOddColor,
                                    rowEvenColor,rowOddColor,rowEvenColor,rowOddColor]]},
            font: {family: "Arial", size: 11, color: ["black"]}
        }
    }]
    Plotly.newPlot('table', data, {width:340, height:350});
    Plotly.newPlot("Eplot", [{x:[0], y:[0], mode: 'markers'}], Elayout);
    Plotly.newPlot("h_eplot", [{x:[0], y:[0], mode: 'markers'}], hlayout);

    // create an event handler that plot Electric field and hilber Electric field traces in another plot
    const clickevent = (electric_hfields) => {
        const electric_hi_field = electric_hfields;
        const antids = electric_hi_field.map(ant => Object.keys(ant)[0]);
       
        plotElement.on('plotly_click', function(eventData){
            const Akey = antids;
            if (eventData.points.length > 0){
                Akey.forEach(key => {
                    if ("A"+ eventData.points[0].pointNumber === key ){
                        plot_electricField(electric_hi_field, key);
                    }
                });
            }
        });
    };
    // plot an electric field traces
    const plot_electricField = (electric_hi_field,e1) => {  // e1 as key
        const ex = [];
        const ey = [];
        const ez = [];
        const Hxs = [];
        const Hys = [];
        const Hzs = [];
    
        for (let i=0; i<electric_hi_field.length; i++){
            if (Object.keys(electric_hi_field[i])[0]===e1){
                ex.push(electric_hi_field[i][e1][0][0]);
                ey.push(electric_hi_field[i][e1][0][1]);
                ez.push(electric_hi_field[i][e1][0][2]);
                Hxs.push(electric_hi_field[i][e1][1][0]);
                Hys.push(electric_hi_field[i][e1][1][1]);
                Hzs.push(electric_hi_field[i][e1][1][2]);
            };
        };
        const Ex = ex[0];
        const Ey = ey[0];
        const Ez = ez[0];
        const Hx = Hxs[0];
        const Hy = Hys[0];
        const Hz = Hzs[0];
    
        const Eminx = Math.min(...Ex);
        const Eminy = Math.min(...Ey);
        const Eminz = Math.min(...Ez);
        const Emin = Math.min(...[Eminx, Eminy, Eminz])- 0.05*Math.abs(Math.min(...[Eminx, Eminy, Eminz]));
        const Emaxx = Math.max(...Ex);
        const Emaxy = Math.max(...Ey);
        const Emaxz = Math.max(...Ez);
        const Emax = Math.max(...[Emaxx, Emaxy, Emaxz]) + 0.05*Math.abs(Math.max(...[Emaxx, Emaxy, Emaxz]));
        // for hilbert envelope
        const hminx = Math.min(...Hx);
        const hminy = Math.min(...Hy);
        const hminz = Math.min(...Hz);
        const hmin = Math.min(...[hminx, hminy, hminz])- 0.05*Math.abs(Math.min(...[hminx, hminy, hminz]));
        const hmaxx = Math.max(...Hx);
        const hmaxy = Math.max(...Hy);
        const hmaxz = Math.max(...Hz);
        const hmax = Math.max(...[hmaxx, hmaxy, hmaxz]) + 0.05*Math.abs(Math.max(...[hmaxx, hmaxy, hmaxz]));
        //create a function that shows transition of electric field
        const Edata = [{
            x: t,            
            y: Ex,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'Ex'
        }, {
            x: t,
            y: Ey,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'Ey'
        },{
            x: t,
            y: Ez,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'Ez',
        }];
        const Elayouts = {
            title: {
                text:"<b>E-field traces ("+e1+")</b>",
            },
            legend:{
                orientation: 'h',
                x:0.5,
                y:0.95,
                xanchor: 'left',  
                yanchor: 'middle',

            },

            xaxis:{
                title: "Time",
                range: [0,3500],
                showline: true,
                showticklabels: true,
                dividerwidth:2,
                ticks: "outside",
                dtick:500,
                minorgridcount: 4
            },
            yaxis:{
                title: "E-field [\u03bcV/m]",
                range: [Emin, Emax],
                showline: true,
                showticklabels: true,
                ticks: "outside"

            },
            width: 530,
            height: 250,//300,
            showgrid: true
        };
        const Hdata = [{
            x: t,
            y: Hx,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'hx'
        }, {
            x: t,
            y: Hy,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'hy'
        },{
            x: t,
            y: Hz,
            type: 'scatter2d',
            mode: "lines",
            colorscale: 'Viridis',
            opacity:1,
            name: 'hz',
        }];
        const hlayouts = {
            title: {
                text: "Hilbert Envelope",
                font:{
                    size: 14
                }
            },
            legend:{
                orientation: 'h',
                x:0.5,
                y:0.95,
                xanchor: 'left',  
                yanchor: 'middle',

            },
            xaxis:{
                title: "Time",
                range: [0,3500],
                showline: true,
                showticklabels: true,
                dividerwidth:2,
                ticks: "outside",
                dtick:500,
                minorgridcount: 4
            },
            yaxis:{
                title: "E-field [\u03bcV/m]",
                range: [hmin, hmax],
                showline: true,
                showticklabels: true,
                ticks: "outside"

            },
            width: 530,
            height: 250,//300,
            showgrid: true
        };
        Plotly.newPlot("h_eplot", Hdata, hlayouts, {scrollZoom: true});
        Plotly.newPlot("Eplot", Edata, Elayouts, {scrollZoom: true});
        
        // create a button for transition effect of electric field varying with time
        const button = document.getElementById("playbutton");
        button.addEventListener("click", function() {
            transition_E(Ex, Ey, Ez, Emin, Emax,e1);
            transition_h(Hx, Hy, Hz, hmin, hmax)
        
        });
    };
    function transition_E(Ex, Ey, Ez, Emin, Emax,e){
        const frames = [];
        let nbr = 1500; // Please set frame length as your choice. I have set default 1500 here nbr=t.length=3500
        for (var i = 0; i < nbr; i++) {
            frames[i] = {data: [{x: [], y: []}, {x: [], y: []},{x: [], y: []}]}
            frames[i].data[0].x = t.slice(0, i+1);
            frames[i].data[0].y = Ex.slice(0, i+1);
            frames[i].data[1].x = t.slice(0, i+1);
            frames[i].data[1].y = Ey.slice(0, i+1);
            frames[i].data[2].x = t.slice(0, i+1);
            frames[i].data[2].y = Ez.slice(0, i+1);
        };
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'Ex',
            x: frames[5].data[0].x,
            y: frames[5].data[0].y,
        };
        
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name: 'Ey',
            x: frames[5].data[1].x,
            y: frames[5].data[1].y,
        };
        
        var trace3 = {
            type: "scatter",
            mode: "lines",
            name: 'Ez',
            x: frames[5].data[2].x,
            y: frames[5].data[2].y,
        }
        
        var data = [trace1,trace2, trace3];
        var layout = {
            title: "<b>E-field traces ("+e+")</b>",
            legend:{
                orientation: 'h',
                x:0.5,
                y:0.95,
                xanchor: 'left',  
                yanchor: 'middle',

            },
            xaxis:{
                title: "Time",
                range: [0,3500],
                showline: true,
                showticklabels: true,
                dividerwidth:2,
                ticks: "outside",
                dtick:500,
                minorgridcount: 4
            },
            yaxis:{
                title: "E-field [\u03bcV/m]",
                range: [Emin, Emax],
                showline: true,
                showticklabels: true,
                ticks: "outside"

            },
            
        };
        
        Plotly.newPlot('Eplot', data, layout).then(function() {
            Plotly.animate('Eplot', frames,{
                fromcurrent: true,
                transition: {
                    duration: 0
                },
                frame: {
                    duration: 0,
                    redraw: false
                }
            });
        });

    };
    // for hilbert
    function transition_h(hx, hy, hz, hmin, hmax){
        const frameh = [];
        let nb = 1500;   // Please set frame length as your choice. I have set default 1500 here nb=t.length=3500
        for (var i = 0; i < nb; i++) {
            frameh[i] = {data: [{x: [], y: []}, {x: [], y: []},{x: [], y: []}]}
            frameh[i].data[0].x = t.slice(0, i+1);
            frameh[i].data[0].y = hx.slice(0, i+1);
            frameh[i].data[1].x = t.slice(0, i+1);
            frameh[i].data[1].y = hy.slice(0, i+1);
            frameh[i].data[2].x = t.slice(0, i+1);
            frameh[i].data[2].y = hz.slice(0, i+1);
        };
        var traceh1 = {
            type: "scatter",
            mode: "lines",
            name: 'hx',
            x: frameh[5].data[0].x,
            y: frameh[5].data[0].y,
        };
        var traceh2 = {
            type: "scatter",
            mode: "lines",
            name: 'hy',
            x: frameh[5].data[1].x,
            y: frameh[5].data[1].y,
        };
        var traceh3 = {
            type: "scatter",
            mode: "lines",
            name: 'hz',
            x: frameh[5].data[2].x,
            y: frameh[5].data[2].y,
        }
        var datas = [traceh1,traceh2, traceh3];
        var hlayout = {
            title:{
                text: "Hilbert Envelope",
                font:{
                    size: 14
                }},
            legend:{
                    orientation: 'h',
                    x:0.5,
                    y:0.95,
                    xanchor: 'left', 
                    yanchor: 'middle',

                },
            xaxis:{
                title: "Time",
                range: [0,3500],
                showline: true,
                showticklabels: true,
                dividerwidth:2,
                ticks: "outside",
                dtick:500,
                minorgridcount: 4
            },
            yaxis:{
                title: "E-field [\u03bcV/m]",
                range: [hmin, hmax],
                showline: true,
                showticklabels: true,
                ticks: "outside"

            },   
        };
        Plotly.newPlot('h_eplot', datas, hlayout).then(function() {
            Plotly.animate('h_eplot', frameh,{
                fromcurrent: true,
                transition: {
                    duration: 0
                },
                frame: {
                    duration: 0,
                    redraw: false
                }
            });
        });

    };

    // let's define a function that display event summary
    const event_information = (values) =>{
        const quantities = [
            "Particle",
            "Ene [EeV]",
            "Zen [deg]",
            "Azi [deg]",
            "Xmax [g/cm2]",
            "BInc [deg]",
            "BDec [deg]"
        ];
        const val = [quantities,values];
        var headerColor = "grey";
        var rowEvenColor = "lightgrey";
        var rowOddColor = "white";
        var data = [{
            type: 'table',
            columnorder: [1,2],
            columnwidth: [1,1],
            header: {
                values: [["<b>Quantity</b>"], ["<b>Values</b>"]],
                align: "center",
                height:20,
                line: {width: 1, color: 'black'},
                fill: {color: headerColor},
                font: {family: "Arial", size: 12, color: "white"}
            },
            cells: {
                values: val,
                align: "center",
                height: 20,
                line: {color: "black", width: 1},
                fill: {color: [[rowOddColor,rowEvenColor,rowOddColor,
                                        rowEvenColor,rowOddColor,rowEvenColor,rowOddColor]]},
                font: {family: "Arial", size: 11, color: ["black"]}
            }
            }]
            
            Plotly.newPlot('table', data, {width:340, height:350});
    };
    
    window.plot_shower_angularPlane = (flippedthinplate_s,x_sp, y_sp, flippedthinplate_a, x_angular, y_angular,sorted_peakamp,w_) =>{
        let x_min_s = Math.min(...x_sp)/1.e3;
        let x_max_s = Math.max(...x_sp)/1.e3;
        let y_min_s = Math.min(...y_sp)/1.e3;
        let y_max_s = Math.max(...y_sp)/1.e3;
        let limi = [x_max_s-x_min_s, y_max_s-y_min_s]
        let lmax = Math.min(...limi);
        let xlim = Array.from({ length: 200 }, (_, i) => (x_min_s - 0.005 * lmax) + i * (1.005 * lmax) / 199);
        let ylim = Array.from({ length: 200 }, (_, i) => (y_min_s - 0.005 * lmax) + i * (1.005 * lmax) / 199);
        let x_min_a = Math.min(...x_angular);
        let x_max_a = Math.max(...x_angular);
        let y_min_a = Math.min(...y_angular);
        let y_max_a = Math.max(...y_angular);
        let limi_a = [x_max_a-x_min_a, y_max_a-y_min_a]
        let lmax_a = Math.min(...limi_a);
        let xlim_a = Array.from({ length: 200 }, (_, i) => (x_min_a - 0.005 * lmax_a) + i * (1.1 * lmax_a) / 199);
        let ylim_a = Array.from({ length: 200 }, (_, i) => (y_min_a - 0.005 * lmax_a) + i * (1.1 * lmax_a) / 199);
        let w = w_;
        let x_omega = w.map((value, index) => (value * (180 / Math.PI)) * Math.sign(y_sp[index]));
        let peakA = sorted_peakamp;
        let shower_data = flippedthinplate_s;
        let angular_data = flippedthinplate_a;
        
        const showertrace = [{
            z: shower_data,
            x: xlim,
            y: ylim,
            type: 'heatmap',
            colorscale: [
                [0, 'rgb(158, 1, 66)'],
                [0.1, 'rgb(213, 62, 79)'],
                [0.2, 'rgb(244, 109, 67)'],
                [0.3, 'rgb(253, 174, 97)'],
                [0.4, 'rgb(254, 224, 139)'],
                [0.5, 'rgb(255, 255, 191)'],
                [0.6, 'rgb(230, 245, 152)'],
                [0.7, 'rgb(171, 221, 164)'],
                [0.8, 'rgb(102, 194, 165)'],
                [0.9, 'rgb(50, 136, 189)'],
                [1, 'rgb(94, 79, 162)']
            ],
            showscale: false,
            zmin: Math.min(...shower_data.flat()),
            zmax: Math.max(...shower_data.flat()),
            hoverongaps: false,
            hovertemplate: '<b>x_sp:</b> %{x:.2f} <br><b>y_sp:</b> %{y:.2f} <br><b>peakA:</b> %{z:.2f} <br><extra></extra>',

        }];
        // traces of angular_data as heatmap
        const angulartrace = [{
            z: angular_data,
            x: xlim_a,
            y: ylim_a,
            type: 'heatmap',
            colorscale: [
                [0, 'rgb(158, 1, 66)'],
                [0.1, 'rgb(213, 62, 79)'],
                [0.2, 'rgb(244, 109, 67)'],
                [0.3, 'rgb(253, 174, 97)'],
                [0.4, 'rgb(254, 224, 139)'],
                [0.5, 'rgb(255, 255, 191)'],
                [0.6, 'rgb(230, 245, 152)'],
                [0.7, 'rgb(171, 221, 164)'],
                [0.8, 'rgb(102, 194, 165)'],
                [0.9, 'rgb(50, 136, 189)'],
                [1, 'rgb(94, 79, 162)']
            ],
            // colorscale: 'Portland',
            showscale: false,
            zmin: Math.min(...shower_data.flat()),
            zmax: Math.max(...shower_data.flat()),
            hoverongaps: false,
            hovertemplate: '<b>x_ap:</b> %{x:.2f} <br><b>y_ap:</b> %{y:.2f} <br><b>peakA:</b> %{z:.2f} <br><extra></extra>',

            
        }];
        //traces of peak with peakA as scatter
        const peaktrace = {
            x: x_omega,
            y: peakA,
            mode: 'markers',
            marker: {
                color: 'black',
                opacity: 0.9,
                size: 4
            },
            type: 'scatter',
        };
        let xmin_p = Math.min(...x_omega) - 0.1
		let xmax_p = Math.max(...x_omega) + 0.1
		let ymin_p = Math.min(...peakA) * 1.05
		let ymax_p = Math.max(...peakA) * 1.05

        const peaklayouts = {
            width: 400,
            height: 270,
            xaxis: {
                title: 'x_omega',
                // range: [xmin_p,xmax_p],
                showticklabels: true,
                ticks: "outside",
            },
            yaxis: {
                title: 'peak amp [\u03bcV/m]',
                // range: [ymin_p,ymax_p]
                showticklabels: true,
                ticks: "outside",
            },
        };

        const showerlayout = {
            width: 550,
            height: 270,
            title: 'Shower Plane',
            xaxis: {
                title: 'vxB [km]',
                range: [x_min_s - 0.005 * lmax, x_min_s + 1.005 * lmax],
                scaleanchor: 'y', // Ensure equal aspect ratio
                constrain: 'domain', // Constrain to domain to avoid auto-scaling issues
                showline: true,
                showticklabels: true,
                ticks: "outside",
            },
            yaxis: {
                title: 'vx(vxB) [km]',
                range: [y_min_s - 0.005 * lmax, y_min_s + 1.005 * lmax],
                scaleratio: 1, // Maintain the aspect ratio
                constrain: 'domain', // Constrain to domain to avoid auto-scaling issues
                showticklabels: true,
                ticks: "outside",
            },
            hovermode: 'closest',
            font: {
                size: 10
            },
            margin: {
                t: 50,
                l: 50,
                r: 50,
                b: 50
            }
        };
        // layout for angular plane
        const angularlayout = {
            width: 550,
            height: 270,
            title: 'Angular Plane',
            xaxis: {
                title: '\u03c9 along vxB [km]',
                range: [x_min_a - 0.005 * lmax_a, x_min_a + 1.005 * lmax_a],
                scaleanchor: 'y', // Ensure equal aspect ratio
                constrain: 'domain' // Constrain to domain to avoid auto-scaling issues
            },
            yaxis: {
                title: '\u03c9 along vx(vxB) [deg]',
                range: [y_min_a - 0.005 * lmax_a, y_min_a + 1.005 * lmax_a],
                scaleratio: 1, // Maintain the aspect ratio
                constrain: 'domain' // Constrain to domain to avoid auto-scaling issues
            },
            hovermode: 'closest',
            font: {
                size: 10
            },
            margin: {
                t: 50,
                l: 50,
                r: 50,
                b: 50
            }
        };
    
        // Create the plot with data and layout
        Plotly.newPlot(plotelement_s, showertrace, showerlayout);
        Plotly.newPlot(plotelement_a, angulartrace, angularlayout);
        Plotly.newPlot(plotelement_p, [peaktrace], peaklayouts);

    }

    window.geometry_plot_section = (id,hitt, hitx, hity, hitz, qinfor,weight) => {
        const key1 = id
        const hitT = hitt;
        const wt = weight;
        const values = qinfor;
        const geodataPoint = Array.from(xValues, (value, index) => ({
            x: value,
            y: yValues[index],
            z: zValues[index],
            isHit: false,
            size: 12,
            color: 'rgba(128, 128, 128, 1)', // Initial color for all points,
            weight:' ',
            hitt: ' ',
            opacity: 1
        }));
        let previoussize = [];
        let previousindex = [];
        const colors = color_pick();   // return colors from color_palette.js
        function prepareFrameData(progress, idx,n) {
            let previouslyHitIndex = -1;
            let previouslyHitSize = 0;
            const geot =  geodataPoint.map((element, index) => {
                const modifiedElement = { ...element, isPreviousHit: false }; // Reset flag
                modifiedElement.color = 
                    index === idx && element.isHit ? colors[index] : // Current hit point
                    (element.isHit && index !== idx) ? colors[index]: // Previously marked hit point (original index)
                    (index === previouslyHitIndex) ? previouslyHitSize : element.color;
                
                modifiedElement.isPreviousHit = element.isHit; // Update flag on hit
                // Update size based on conditions
                modifiedElement.size =
                index === idx && element.isHit ? Math.log(wt[index])*4 : // Current hit point
                (element.isHit && index !== idx) ? Math.log(wt[index])*4: // Previously marked hit point (original index)
                (index === previouslyHitIndex) ? previouslyHitSize : element.size; // Update size at previous hit point index
                
                modifiedElement.weight = 
                    index === idx && element.isHit ? wt[index] : // Current hit weight
                    (element.isHit && index !== idx) ? wt[index]: // Previously marked hit weight (original index)
                    (index === previouslyHitIndex) ? previouslyHitSize : element.weight;

                modifiedElement.hitt = 
                    index === idx && element.isHit ? hitT[index] : // Current hit time
                    (element.isHit && index !== idx) ? hitT[index]: // Previously marked hit time (original index)
                    (index === previouslyHitIndex) ? previouslyHitSize : element.hitt;
           
                return modifiedElement;
            });
            // // Update previously hit point info after processing data points (optional)
            previousindex.push(idx);
            return geot;
        };
            // i am pushing a frame data here and filter it out according to the size
        function createPlot(showHitPoints = false, idx,n) {
            const updatedData = prepareFrameData(showHitPoints ? 1 : 0, idx,n);
            //const weights = updatedData.map(point => point.weight)
            const trace = {
                x: updatedData.map(point => point.x),
                y: updatedData.map(point => point.y),
                z: updatedData.map(point => point.z),
                mode: 'markers',
                marker: {
                    size: updatedData.map(point => point.size),
                    opacity: 1,
                    color: updatedData.map(point => point.color)
                },
                hovertemplate: '<b>X:</b> %{x:.2f} <br><b>Y:</b> %{y:.2f} <br><b>Z:</b> %{z:.2f} <br><b>time:</b> %{text:.2f} <br><b>Weight:</b> %{customdata:.5f} <extra></extra>',
                text: updatedData.map(point => point.hitt),
                customdata: updatedData.map(point => point.weight),
                type: 'scatter3d'
            };

            Plotly.newPlot(plotElement,[trace], layout);

            // display event summary
            event_information(values);
            
            // place here an click event for point click on plot
            const electric_hfields = window.electric_hfield
            clickevent(electric_hfields);
        };
        const sortedHitXValues = hitx;
        const sortedHitYValues = hity;
        const sortedHitZValues = hitz;

        const showHitPointsButton = document.getElementById('showHitPointsButton');
        showHitPointsButton.addEventListener('click', () => {
            let updateCount = 0;
            let idx = 0;
            // this will update each hit point every 500 millisecond
            const intervalId = setInterval(() => {
                if (updateCount >= sortedHitXValues.length) { 
                    clearInterval(intervalId);
                    return;
                }
                
                const indx = sortedHitXValues[updateCount];    // using sorted hit points values here
                const indy = sortedHitYValues[updateCount];
                const indz = sortedHitZValues[updateCount];
                for (let i=0; i<xValues.length; i++){
                    if (geodataPoint[i].x == indx && geodataPoint[i].y == indy && geodataPoint[i].z == indz) { 
                        geodataPoint[i].isHit = true;
                        idx = i;
                        break;
                    }
                }
                updateCount++;
                let n = updateCount-1;
                createPlot(true, idx,n);
            }, 500); // Update every 0.5 seconds
        });
    };

});

