import React, { useState } from 'react';
import { Cpu, Cloud, Wifi, AlertTriangle, CheckCircle, Activity, Thermometer, Droplets, Wind, Zap } from 'lucide-react';

const EdgeEnvironmentalMonitoring = () => {
  const [activeTab, setActiveTab] = useState('architecture');

  const architectureData = {
    layers: [
      {
        name: 'Device Layer',
        icon: <Thermometer className="w-6 h-6" />,
        components: ['Environmental Sensors', 'Edge Gateways', 'Low-Power Wireless'],
        description: 'IoT sensors collecting temperature, humidity, air quality, noise, etc.'
      },
      {
        name: 'Edge Layer',
        icon: <Cpu className="w-6 h-6" />,
        components: ['Edge Computing Nodes', 'Local Processing', 'Data Filtering'],
        description: 'Real-time processing, anomaly detection, and data aggregation at the edge'
      },
      {
        name: 'Fog Layer',
        icon: <Wifi className="w-6 h-6" />,
        components: ['Fog Nodes', 'Local Storage', 'Analytics'],
        description: 'Intermediate processing for complex analytics and local decision making'
      },
      {
        name: 'Cloud Layer',
        icon: <Cloud className="w-6 h-6" />,
        components: ['Cloud Storage', 'ML Models', 'Dashboard'],
        description: 'Long-term storage, advanced analytics, and centralized management'
      }
    ]
  };

  const deviceSpecs = [
    {
      category: 'Environmental Sensors',
      devices: [
        { name: 'Temperature & Humidity', model: 'DHT22/BME280', range: '-40°C to 80°C', power: '2.5mA' },
        { name: 'Air Quality', model: 'MQ-135/CCS811', metrics: 'CO2, VOC, PM2.5', power: '33mA' },
        { name: 'Noise Level', model: 'Sound Sensor', range: '30-130 dB', power: '5mA' },
        { name: 'Light Intensity', model: 'BH1750', range: '1-65535 lux', power: '0.12mA' }
      ]
    },
    {
      category: 'Edge Gateways',
      devices: [
        { name: 'Raspberry Pi 4', specs: 'Quad-core, 4GB RAM', protocols: 'WiFi, BT, Ethernet', power: '3W' },
        { name: 'NVIDIA Jetson Nano', specs: '4-core ARM, 2GB RAM', ml: 'GPU-accelerated ML', power: '5-10W' },
        { name: 'Arduino MKR WAN 1310', specs: 'LoRaWAN, Low-power', range: 'Up to 10km', power: '104mA' }
      ]
    }
  ];

  const edgeProcessing = [
    {
      technique: 'Data Filtering & Aggregation',
      description: 'Reduce data volume by 70-90% through intelligent filtering',
      implementation: 'Time-series aggregation, delta compression, outlier removal'
    },
    {
      technique: 'Anomaly Detection',
      description: 'Real-time detection using lightweight ML models',
      implementation: 'Statistical methods, LSTM autoencoders, isolation forests'
    },
    {
      technique: 'Event-Driven Processing',
      description: 'Trigger alerts only when thresholds are exceeded',
      implementation: 'Complex event processing (CEP), rule engines'
    },
    {
      technique: 'Predictive Maintenance',
      description: 'Predict sensor failures before they occur',
      implementation: 'TinyML models, edge inference with TensorFlow Lite'
    }
  ];

  const implementation = {
    connectivity: [
      { protocol: 'LoRaWAN', useCase: 'Long-range (10km+), Low-power', dataRate: '0.3-50 kbps' },
      { protocol: 'NB-IoT', useCase: 'Cellular, Wide coverage', dataRate: '200 kbps' },
      { protocol: 'WiFi 6', useCase: 'High-speed, Short-range', dataRate: '100+ Mbps' },
      { protocol: 'Zigbee/Thread', useCase: 'Mesh networks, Low-power', dataRate: '250 kbps' },
      { protocol: 'BLE 5.0', useCase: 'Ultra-low power, Proximity', dataRate: '2 Mbps' }
    ],
    dataFlow: [
      { step: '1. Sensor Reading', time: '< 1ms', location: 'IoT Device' },
      { step: '2. Edge Preprocessing', time: '< 10ms', location: 'Edge Gateway' },
      { step: '3. Local Decision', time: '< 50ms', location: 'Edge/Fog Node' },
      { step: '4. Alert Trigger', time: '< 100ms', location: 'Edge Node' },
      { step: '5. Cloud Sync', time: '< 1s', location: 'Cloud Backend' }
    ],
    security: [
      'End-to-end encryption (TLS 1.3, AES-256)',
      'Device authentication (X.509 certificates)',
      'Secure boot and firmware updates (OTA)',
      'Data anonymization at edge',
      'Zero-trust network architecture'
    ]
  };

  const sampleMetrics = [
    { param: 'Temperature', value: '24.3°C', status: 'normal', trend: '+0.2' },
    { param: 'Humidity', value: '62%', status: 'normal', trend: '-1.5' },
    { param: 'Air Quality', value: '45 AQI', status: 'good', trend: '+3' },
    { param: 'Noise Level', value: '58 dB', status: 'normal', trend: '+2' },
    { param: 'CO2 Level', value: '780 ppm', status: 'warning', trend: '+45' },
    { param: 'PM2.5', value: '18 µg/m³', status: 'normal', trend: '-2' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Activity className="w-10 h-10 text-blue-400" />
            Edge IoT Environmental Monitoring System
          </h1>
          <p className="text-blue-200 text-lg">Real-time environmental data processing at the edge</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['architecture', 'devices', 'processing', 'implementation', 'monitoring'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">System Architecture</h2>
              <div className="grid gap-4">
                {architectureData.layers.map((layer, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-6 hover:bg-slate-650 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="text-blue-400 mt-1">{layer.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{layer.name}</h3>
                        <p className="text-slate-300 mb-3">{layer.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {layer.components.map((comp, i) => (
                            <span key={i} className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Key Benefits of Edge Processing</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Low Latency', desc: 'Process data locally for <50ms response time' },
                  { title: 'Bandwidth Efficiency', desc: 'Reduce cloud traffic by 70-90%' },
                  { title: 'Reliability', desc: 'Continue operation during network outages' },
                  { title: 'Privacy', desc: 'Keep sensitive data at the edge' }
                ].map((benefit, i) => (
                  <div key={i} className="bg-slate-700 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mb-2" />
                    <h4 className="font-bold mb-1">{benefit.title}</h4>
                    <p className="text-slate-300 text-sm">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <div className="space-y-6">
            {deviceSpecs.map((category, idx) => (
              <div key={idx} className="bg-slate-800 rounded-xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">{category.category}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-300">Device/Sensor</th>
                        <th className="text-left py-3 px-4 text-slate-300">Model/Specs</th>
                        <th className="text-left py-3 px-4 text-slate-300">Capabilities</th>
                        <th className="text-left py-3 px-4 text-slate-300">Power</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.devices.map((device, i) => (
                        <tr key={i} className="border-b border-slate-700 hover:bg-slate-700">
                          <td className="py-3 px-4 font-semibold">{device.name}</td>
                          <td className="py-3 px-4 text-slate-300">{device.model || device.specs}</td>
                          <td className="py-3 px-4 text-slate-300">{device.range || device.metrics || device.protocols || device.ml}</td>
                          <td className="py-3 px-4">
                            <span className="bg-green-900 text-green-200 px-2 py-1 rounded text-sm">
                              {device.power}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Processing Tab */}
        {activeTab === 'processing' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Edge Processing Techniques</h2>
              <div className="space-y-4">
                {edgeProcessing.map((tech, idx) => (
                  <div key={idx} className="bg-slate-700 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2">{tech.technique}</h3>
                    <p className="text-slate-300 mb-3">{tech.description}</p>
                    <div className="bg-slate-800 rounded p-3">
                      <p className="text-sm text-blue-200">
                        <span className="font-semibold">Implementation:</span> {tech.implementation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Software Stack</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Edge Runtime</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Node-RED for flow-based</li>
                    <li>• EdgeX Foundry</li>
                    <li>• AWS IoT Greengrass</li>
                    <li>• Azure IoT Edge</li>
                  </ul>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-bold mb-2">ML Frameworks</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• TensorFlow Lite</li>
                    <li>• PyTorch Mobile</li>
                    <li>• ONNX Runtime</li>
                    <li>• TinyML libraries</li>
                  </ul>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Protocols</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• MQTT for messaging</li>
                    <li>• CoAP for constrained</li>
                    <li>• HTTP/2 for APIs</li>
                    <li>• WebSocket for streaming</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Implementation Tab */}
        {activeTab === 'implementation' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Connectivity Options</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300">Protocol</th>
                      <th className="text-left py-3 px-4 text-slate-300">Use Case</th>
                      <th className="text-left py-3 px-4 text-slate-300">Data Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {implementation.connectivity.map((conn, i) => (
                      <tr key={i} className="border-b border-slate-700 hover:bg-slate-700">
                        <td className="py-3 px-4 font-semibold">{conn.protocol}</td>
                        <td className="py-3 px-4 text-slate-300">{conn.useCase}</td>
                        <td className="py-3 px-4">
                          <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded text-sm">
                            {conn.dataRate}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Data Flow Timeline</h3>
                <div className="space-y-3">
                  {implementation.dataFlow.map((flow, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-blue-900 text-blue-200 rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-slate-700 rounded-lg p-3">
                        <div className="font-semibold">{flow.step}</div>
                        <div className="text-sm text-slate-300">
                          {flow.time} • {flow.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-blue-400">Security Measures</h3>
                <div className="space-y-3">
                  {implementation.security.map((measure, i) => (
                    <div key={i} className="flex items-start gap-3 bg-slate-700 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">{measure}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Real-Time Environmental Metrics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleMetrics.map((metric, i) => (
                  <div key={i} className="bg-slate-700 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-slate-300">{metric.param}</h3>
                      {metric.status === 'normal' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {metric.status === 'good' && <CheckCircle className="w-5 h-5 text-blue-400" />}
                      {metric.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div className="text-3xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">
                      Trend: <span className={metric.trend.startsWith('+') ? 'text-red-400' : 'text-green-400'}>
                        {metric.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-blue-400">System Health Dashboard</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">98.7%</div>
                  <div className="text-sm text-slate-300">Uptime</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">47ms</div>
                  <div className="text-sm text-slate-300">Avg Latency</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <Wifi className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">124</div>
                  <div className="text-sm text-slate-300">Active Devices</div>
                </div>
                <div className="bg-slate-700 rounded-lg p-4 text-center">
                  <Cloud className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2.3GB</div>
                  <div className="text-sm text-slate-300">Data/Day</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EdgeEnvironmentalMonitoring;