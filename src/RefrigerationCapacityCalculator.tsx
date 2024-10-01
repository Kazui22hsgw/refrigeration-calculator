import React, { useState, useEffect } from 'react';

const RefrigerationCapacityCalculator = () => {
  const [frequency, setFrequency] = useState('60');
  const [temperatureDifference, setTemperatureDifference] = useState('5');
  const [capacity, setCapacity] = useState(0);

  const baseFlowRate = 960; // L/min at 60Hz
  const density = 1097; // kg/m³
  const specificHeat = 3.2; // kJ/kg·K (assumed for ナイブライン Z-1 70%)

  useEffect(() => {
    const calculateCapacity = () => {
      const freqValue = parseFloat(frequency) || 0;
      const tempDiffValue = parseFloat(temperatureDifference) || 0;
      
      // Calculate flow rate based on frequency
      const flowRate = (baseFlowRate * freqValue) / 60;
      // Convert L/min to kg/s
      const massFlowRate = (flowRate * density) / (60 * 1000);
      // 冷凍能力を計算
      const calculatedCapacity = massFlowRate * specificHeat * tempDiffValue;
      setCapacity(Number(calculatedCapacity.toFixed(2)));
    };

    calculateCapacity();
  }, [frequency, temperatureDifference]);

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-6">冷凍能力計算ツール</h2>
        <div className="mb-4">
          <label className="block mb-2">周波数 (Hz):</label>
          <input
            type="text"
            value={frequency}
            onChange={handleInputChange(setFrequency)}
            className="w-full p-2 border rounded text-center"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2">温度差 (K):</label>
          <input
            type="text"
            value={temperatureDifference}
            onChange={handleInputChange(setTemperatureDifference)}
            className="w-full p-2 border rounded text-center"
          />
        </div>
        <div className="mt-6">
          <strong>計算結果:</strong>
          <p className="text-xl font-semibold mt-2">冷凍能力: {capacity} kW</p>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          注: この計算はナイブライン Z-1 70%、密度1097 kg/m³、比熱3.2 kJ/kg·Kを前提としています。
          実際の値は、正確な流体特性やシステム条件により異なる場合があります。
        </p>
      </div>
    </div>
  );
};

export default RefrigerationCapacityCalculator;
