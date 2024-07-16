/* 
  Written by:
        SHIVAJI CHAULAGAIN

  *for reading the hdf5file of GRAND EVENT NEUTRINO COLLABORATION
*/

// reading antenna geometry from antenna_geometry.js
const geodata = antenna_geometry();

const process_data = async (hdf5File,filename) => {
    function readDataset(datasetPath) {
        try {
            let dataset = hdf5File.get(datasetPath);
            if (dataset) {
                let data = dataset.value;
                return data;
            } else {
                console.log(`${datasetPath} dataset not found`);
                return null;
            }
        } catch (error) {
            console.error(`Error reading dataset ${datasetPath}:`, error);
            return null;
        }
    };

    // read eventinfo
    let event_info = readDataset(filename+'/EventInfo');
    function readElectricField(antennaId) {
        let efieldPath = filename+'/AntennaTraces/'+antennaId+'/efield';
        let efielddata = readDataset(efieldPath);
        let Ex = Array.from(efielddata, ex => ex[1]);
        let Ey = Array.from(efielddata, ex => ex[2]);
        let Ez = Array.from(efielddata, ex => ex[3]);
    }
    let antennas = readDataset(filename+'/AntennaInfo');
    let ant_id = Array.from(antennas, id => id[0]);
    let hitts = Array.from(antennas, id => id[4]);
    //extract hitx core coordinates from antenna info
    let hitXc = Array.from(antennas, id=> id[1]);
    let hitYc = Array.from(antennas, id=> id[2]);
    let hitZc = Array.from(antennas, id=> id[3]);
    let antid_num = ant_id.map(id => id.replace('A',''));
    let hitT = {};
    for (let i = 0; i < antid_num.length; i++) {
        hitT[antid_num[i]] = hitts[i];
    };
    window.electric_hfield = await Promise.all(ant_id.map(async antid => {
        const efieldPath = filename+'/AntennaTraces/'+antid+'/efield';
        let efielddata = readDataset(efieldPath);
        let timeremove_efield = efielddata.map(dat => dat.slice(1))
        let efielddatas = efielddata.map(row => {
            const timeInSeconds = row[0] / 1e9;
            return [timeInSeconds, row[1], row[2], row[3]]; 
        });
        const hilberttransform_efield = await filters(efielddatas); // perform hilbert transform of the efield data . passes argument to hilbertTransform.js
        let hx = hilberttransform_efield[0];
        let hy = hilberttransform_efield[1];
        let hz = hilberttransform_efield[2];
        let peakamp = hilberttransform_efield[3];
        let ex = Array.from(efielddata, ex => ex[1]);
        let ey = Array.from(efielddata, ex => ex[2]);
        let ez = Array.from(efielddata, ex => ex[3]);
        let result = {};

        for (let i = 0; i < antid.length; i++) {
            result[antid] = [[ex, ey,ez],[hx, hy, hz], peakamp];
        }
        return result;
    }));
    let peakAmplitude = [];
    window.Eweight = {};
    for (let i=0; i<antid_num.length; i++){
        window.Eweight[antid_num[i]] = Math.round((window.electric_hfield[i][ant_id[i]][2]+15)*1000)/1000;
        peakAmplitude.push(window.electric_hfield[i][ant_id[i]][2])
    };
    const combined = ant_id.map((id, index) => {
        return { 
            ant_id: id, 
            hitt: hitts[index], 
            hitXc: hitXc[index], 
            hitYc: hitYc[index], 
            hitZc: hitZc[index],
            peakamp:peakAmplitude[index]
        };
    });
    // Sort the array by the hitt values
    combined.sort((a, b) => a.hitt - b.hitt);
    // Extract the sorted hitXc, hitYc, hitZc values
    const sorted_hitXc = combined.map(item => item.hitXc);
    const sorted_hitYc = combined.map(item => item.hitYc);
    const sorted_hitZc = combined.map(item => item.hitZc);
    const sorted_peakamp = combined.map(item => item.peakamp);

    // information about particle and its energy, energy and angle
    // let quantity = ["Particle","Ene [EeV]","Zen [deg]","Azi [deg]","Xmax [g/cm2]","BInc [deg]","BDec [deg]"];
    let quan_index = [2,3,4,5,9,17,18];
    let quantity_val = quan_index.map(ind => event_info[0][ind]);
    quantity_val[2] = Math.round(quantity_val[2]*1000)/1000;
    let zenith = quantity_val[2]*(Math.PI / 180);
    let azimuth = quantity_val[3]*(Math.PI / 180);
    let BfieldINc = quantity_val[5]*(Math.PI / 180)+ Math.PI/2;
    let BfieldDec = -1*quantity_val[6]*(Math.PI / 180);
    let xmax_position = event_info[0][7];
    let x_xmax = xmax_position[0];
    let y_xmax = xmax_position[1];
    let z_xmax = xmax_position[2];


    //...............................................................

    //sorting hitvalues by its hittime
    const timeValues = antid_num.map(key => {
        // Extract the number part of the key
        return hitT[key];
    });
    const keyValuePairs = ant_id.map((key, index) => {
        return { key: key, time: timeValues[index] };
    });
    keyValuePairs.sort((a, b) => a.time - b.time);
    let hitxvalues = keyValuePairs.map(pair => {
        const hitx = ant_id.find(value => value === pair.key);
        return geodata[0][hitx]['X'];
    });
    let hityvalues = keyValuePairs.map(pair => {
        const hity = ant_id.find(value => value === pair.key);
        return geodata[0][hity]['Y'];
    });
    let hitzvalues = keyValuePairs.map(pair => {
        const hitz = ant_id.find(value => value === pair.key);
        return geodata[0][hitz]['Z'];
    });
    let mean_hitzvalues = hitzvalues.reduce((a, b) => a + b, 0) / hitzvalues.length;
    let core = [0,0,mean_hitzvalues];
    let k_shower = [
        Math.sin(zenith) * Math.cos(azimuth),
        Math.sin(zenith) * Math.sin(azimuth),
        Math.cos(zenith)
    ];
    //perform rbf interpolation on peak_amplitude_shower_plane
    let resultshowerplane = getInShowerPlane([sorted_hitXc,sorted_hitYc, sorted_hitZc],k_shower,core, BfieldINc,BfieldDec);
    let x_sp = resultshowerplane[0];
    let y_sp = resultshowerplane[1];
    let z_sp = resultshowerplane[2];
    let x_range = [Math.min(...x_sp), Math.max(...x_sp)];
    let y_range = [Math.min(...y_sp), Math.max(...y_sp)];
    let step = 200;
    let Xsp = generateFineGrid(x_range, y_range, step)['xFine'];
    let Ysp = generateFineGrid(x_range, y_range, step)['yFine'];
    const thinPlateSplineData =  rbfInterpolation(x_sp, y_sp, sorted_peakamp, Xsp, Ysp, thinPlateSplineRBF, 9); //thinplate function
    const flippedthinplate_s = thinPlateSplineData.slice().reverse();
    
    //...................................................................
    //.................................................................
    // perform rbf interpolation on peak_amplitude_angular_plane
    let XmaxA_x = new Float64Array(sorted_hitXc.map(hit => hit - x_xmax));
    let YmaxA_x = new Float64Array(sorted_hitYc.map(hit => hit - y_xmax));
    let ZmaxA_x = new Float64Array(sorted_hitZc.map(hit => hit - z_xmax));
    let obs = [XmaxA_x, YmaxA_x, ZmaxA_x];
    let lengths = new Float64Array(XmaxA_x.length);
    for (let i = 0; i < XmaxA_x.length; i++) {
        lengths[i] = Math.sqrt(XmaxA_x[i] ** 2 + YmaxA_x[i] ** 2 + ZmaxA_x[i] ** 2);
    }

    let u_ant = obs.map((coordArray, index) => 
        coordArray.map((coord, i) => coord / lengths[i])
    );
    let cosw = dotProduct(k_shower, u_ant);
    cosw.forEach((value, index, array) => {
        if (value > 1) {
            array[index] = 1;
        }
    });
    let w_ = cosw.map(val => Math.acos(val));
    let eta = x_sp.map((_,index) => Math.atan2(y_sp[index], x_sp[index]));
    let x_angular = w_.map((value, index) => (180/Math.PI*value)*Math.cos(eta[index]));
    let y_angular = w_.map((value, index) => (180/Math.PI*value)*Math.sin(eta[index]));
    let x_range_a = [Math.min(...x_angular), Math.max(...x_angular)];
    let y_range_a = [Math.min(...y_angular), Math.max(...y_angular)];
    let Xang = generateFineGrid(x_range_a, y_range_a, step)['xFine'];
    let Yang = generateFineGrid(x_range_a, y_range_a, step)['yFine'];
    const quinticData =  rbfInterpolation(x_angular, y_angular, sorted_peakamp, Xang, Yang, quinticRBF, 9); // function quintic
    // const flippedthinplate_a = quinticData.slice().reverse();
    // passed parameter to the defined function plot_shower_angularPlane  to show the angular plot and shower plot
    plot_shower_angularPlane(thinPlateSplineData,x_sp, y_sp, quinticData, x_angular, y_angular,sorted_peakamp, w_);
    //.......................................................................................................
    const weight = window.Eweight;
    geometry_plot_section(ant_id, hitT, hitxvalues, hityvalues, hitzvalues, quantity_val, weight )
};
