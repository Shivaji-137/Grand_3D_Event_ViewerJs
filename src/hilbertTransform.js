/* 
  Written by:
        SHIVAJI CHAULAGAIN

  * I have used oregondsp.js library for performing butterworth filter and tensorflow.js for performing fft.
   Oregondsp.js libary's butterworth filter has only  analog butterfilter properties. DIgital butterfilter
   can be obtained using suitable transformation on analog. Analog is used here.

   This code returns hilbert transformation of the varying electric field
*/

async function _butter_bandpass_filter(data, lowcut, highcut, fs) {
    // Assuming you have the necessary Butterworth filter implementation
    const nyquist = 0.5 * fs;
    const low = lowcut / nyquist;
    const high = highcut / nyquist;
    const delta = 2 * Math.PI * (high - low); // bandwidth
    const butterworth = new oregondsp.com.oregondsp.signalProcessing.filter.iir.Butterworth(5, oregondsp.com.oregondsp.signalProcessing.filter.iir.PassbandType.BANDPASS, low, high, delta);
    butterworth.filterInPlace(data);
    return data;
};

async function filters(voltages) {
    const fmin = 50.e6;
    const fmax = 200.e6;
    let t = voltages.map(row => row[0]);
    let v = voltages.map(row => row.slice(1));  // Raw signal
    let periods = t.reduce((a, b, i, arr) => a + (b - (arr[i - 1] || b)), 0) / (t.length - 1);
    let fs = 1 / periods;  // Compute frequency step
    let nCh = v[0].length;
    let res = [...t];
    for (let i = 0; i < nCh; i++) {
        let vi = v.map(row => row[i]);
        let filteredVi = await _butter_bandpass_filter(vi, fmin, fmax, fs);
        res = res.concat(filteredVi);
    }
    let reshapedRes = [];
    for (let i = 0; i < t.length; i++) {
        let tempArr = [res[i]];
        for (let j = 0; j < nCh; j++) {
        tempArr.push(res[t.length + i + j * t.length]);
        }
        reshapedRes.push(tempArr);
    }
    const Hx = await abs_hilbertTransform(reshapedRes.map(e => e[1]));
    const Hy = await abs_hilbertTransform(reshapedRes.map(e => e[2]));
    const Hz = await abs_hilbertTransform(reshapedRes.map(e => e[3]));
    const peakamp_x = Math.max(...Hx);
    const peakamp_y = Math.max(...Hy);
    const peakamp_z = Math.max(...Hz);
    const peak = [peakamp_x, peakamp_y, peakamp_z]
    const peakamp = Math.max(...peak);
    return [Hx, Hy, Hz, peakamp];  
}

async function abs_hilbertTransform(data) {
    const N = data.length;
    const realTensor = tf.tensor1d(data);
    const imagTensor = tf.zeros([N]);
    const complexTensor = tf.complex(realTensor, imagTensor);

    // Perform FFT
    const fftData = tf.spectral.fft(complexTensor);

    // Apply the Hilbert transform
    let h = Array(N).fill(0);
    if (N % 2 === 0) {
        h[0] = 1;
        h[N / 2] = 1;
        for (let i = 1; i < N / 2; i++) {
        h[i] = 2;
        }
    } else {
        h[0] = 1;
        for (let i = 1; i < (N + 1) / 2; i++) {
        h[i] = 2;
        }
    }

    const hilbertFilter = tf.complex(tf.tensor1d(h), tf.zeros([N]));
    const hilbertTransformed = tf.mul(fftData, hilbertFilter);

    // Perform inverse FFT
    const ifftData = tf.spectral.ifft(hilbertTransformed);

    // Get absolute value of Hilbert transform
    const absIfftData = tf.abs(ifftData);
    const resultArray = await absIfftData.array();
    return resultArray;
}