import React, { useState, useEffect } from 'react';
import { Activity, Database, Settings, Bell, Plus, Trash2, AlertTriangle, CheckCircle, Thermometer, Droplets, Wind, Cloud } from 'lucide-react';

const IoTMonitoringApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [devices, setDevices] = useState([]);
  const [readings, setReadings] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const devicesData = await window.storage.get('iot-devices');
      const readingsData = await window.storage.get('iot-readings');
      const alertsData = await window.storage.get('iot-alerts');

      if (devicesData) setDevices(JSON.parse(devicesData.value));
      if (readingsData) setReadings(JSON.parse(readingsData.value));
      if (alertsData) setAlerts(JSON.parse(alertsData.value));
    } catch (error) {
      console.log('No existing data, starting fresh');
    }
    setLoading(false);
  };

  const saveDevices = async (newDevices) => {
    setDevices(newDevices);
    try {
      await window.storage.set('iot-devices', JSON.stringify(newDevices));
    } catch (error) {
      console.error('Error saving devices:', error);
    }
  };

  const saveReadings = async (newReadings) => {
    setReadings(newReadings);
    try {
      await window.storage.set('iot-readings', JSON.stringify(newReadings));
    } catch (error) {
      console.error('Error saving readings:', error);
    }
  };

  const saveAlerts = async (newAlerts) => {
    setAlerts(newAlerts);
    try {
      await window.storage.set('iot-alerts', JSON.stringify(newAlerts));
    } catch (error) {
      console.error('Error saving alerts:', error);
    }
  };

  const Dashboard = () => {
    const latestReadings = readings.slice(-4);
    const activeDevicesCount = devices.filter(d => d.status === 'active').length;
    const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Environmental Monitoring Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <Activity className="mb-2" size={32} />
            <div className="text-3xl font-bold">{devices.length}</div>
            <div className="text-sm opacity-90">Total Devices</div>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <CheckCircle className="mb-2" size={32} />
            <div className="text-3xl font-bold">{activeDevicesCount}</div>
            <div className="text-sm opacity-90">Active Devices</div>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <Database className="mb-2" size={32} />
            <div className="text-3xl font-bold">{readings.length}</div>
            <div className="text-sm opacity-90">Total Readings</div>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <Bell className="mb-2" size={32} />
            <div className="text-3xl font-bold">{criticalAlerts}</div>
            <div className="text-sm opacity-90">Critical Alerts</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Latest Sensor Readings</h3>
          {latestReadings.length === 0 ? (
            <p className="text-gray-500">No readings yet. Add a device and create readings!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {latestReadings.map((reading, idx) => (
                <div key={idx} className="border border-gray-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {reading.type === 'temperature' && <Thermometer className="text-red-500" />}
                    {reading.type === 'humidity' && <Droplets className="text-blue-500" />}
                    {reading.type === 'air_quality' && <Wind className="text-green-500" />}
                    {reading.type === 'pressure' && <Cloud className="text-purple-500" />}
                    <span className="font-semibold text-gray-700">{reading.deviceName}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{reading.value} {reading.unit}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(reading.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Alerts</h3>
          {alerts.length === 0 ? (
            <p className="text-gray-500">No alerts. System is running smoothly!</p>
          ) : (
            <div className="space-y-2">
              {alerts.slice(-5).reverse().map((alert, idx) => (
                <div key={idx} className={`p-4 rounded-lg border-l-4 ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                  'bg-blue-50 border-blue-500'
                }`}>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={
                      alert.severity === 'critical' ? 'text-red-500' :
                      alert.severity === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    } />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{alert.message}</div>
                      <div className="text-sm text-gray-600">Device: {alert.deviceName}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(alert.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Devices = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      type: 'temperature',
      location: '',
      status: 'active'
    });

    const handleAddDevice = () => {
      if (!formData.name || !formData.location) {
        alert('Please fill all fields');
        return;
      }
      
      const newDevice = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };
      saveDevices([...devices, newDevice]);
      setFormData({ name: '', type: 'temperature', location: '', status: 'active' });
      setShowForm(false);
    };

    const deleteDevice = (id) => {
      if (window.confirm('Are you sure you want to delete this device?')) {
        saveDevices(devices.filter(d => d.id !== id));
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">IoT Devices</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Device
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Device</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Sensor-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sensor Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="temperature">Temperature Sensor</option>
                  <option value="humidity">Humidity Sensor</option>
                  <option value="air_quality">Air Quality Sensor</option>
                  <option value="pressure">Pressure Sensor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Building A - Floor 2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddDevice}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Device
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {devices.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No devices registered yet. Click "Add Device" to get started!
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {devices.map((device) => (
                  <tr key={device.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{device.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{device.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{device.location}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        device.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => deleteDevice(device.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  const Readings = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
      deviceId: '',
      value: '',
      unit: '°C'
    });

    const handleAddReading = () => {
      if (!formData.deviceId || !formData.value) {
        alert('Please fill all fields');
        return;
      }

      const device = devices.find(d => d.id === parseInt(formData.deviceId));
      if (!device) return;

      const newReading = {
        id: Date.now(),
        deviceId: device.id,
        deviceName: device.name,
        type: device.type,
        value: parseFloat(formData.value),
        unit: formData.unit,
        timestamp: new Date().toISOString()
      };

      const newReadings = [...readings, newReading];
      saveReadings(newReadings);
      checkThresholds(newReading);

      setFormData({ deviceId: '', value: '', unit: '°C' });
      setShowForm(false);
    };

    const checkThresholds = (reading) => {
      let shouldAlert = false;
      let severity = 'info';
      let message = '';

      if (reading.type === 'temperature' && reading.value > 35) {
        shouldAlert = true;
        severity = 'critical';
        message = `High temperature detected: ${reading.value}${reading.unit}`;
      } else if (reading.type === 'humidity' && reading.value > 80) {
        shouldAlert = true;
        severity = 'warning';
        message = `High humidity detected: ${reading.value}${reading.unit}`;
      } else if (reading.type === 'air_quality' && reading.value > 150) {
        shouldAlert = true;
        severity = 'critical';
        message = `Poor air quality detected: ${reading.value} AQI`;
      }

      if (shouldAlert) {
        const newAlert = {
          id: Date.now(),
          deviceId: reading.deviceId,
          deviceName: reading.deviceName,
          severity,
          message,
          timestamp: new Date().toISOString()
        };
        saveAlerts([...alerts, newAlert]);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Sensor Readings</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={devices.length === 0}
          >
            <Plus size={20} />
            Add Reading
          </button>
        </div>

        {devices.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-yellow-800">Please add devices first before recording readings.</p>
          </div>
        )}

        {showForm && devices.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Add New Reading</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Device</label>
                <select
                  value={formData.deviceId}
                  onChange={(e) => setFormData({...formData, deviceId: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a device...</option>
                  {devices.map(device => (
                    <option key={device.id} value={device.id}>
                      {device.name} ({device.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({...formData, value: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 25.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="°C">°C</option>
                    <option value="°F">°F</option>
                    <option value="%">%</option>
                    <option value="AQI">AQI</option>
                    <option value="hPa">hPa</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddReading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Reading
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {readings.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No readings recorded yet. Click "Add Reading" to start monitoring!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {readings.slice().reverse().map((reading) => (
                    <tr key={reading.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{reading.deviceName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{reading.type.replace('_', ' ')}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                        {reading.value} {reading.unit}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(reading.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Loading system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">IoT Environmental Monitor</h1>
            </div>
            <div className="text-sm text-gray-600">
              Edge Computing • Real-time Monitoring
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="inline mr-2" size={18} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'devices'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="inline mr-2" size={18} />
              Devices
            </button>
            <button
              onClick={() => setActiveTab('readings')}
              className={`px-6 py-3 font-medium transition-all ${
                activeTab === 'readings'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Database className="inline mr-2" size={18} />
              Readings
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'devices' && <Devices />}
        {activeTab === 'readings' && <Readings />}
      </main>
    </div>
  );
};

export default IoTMonitoringApp;