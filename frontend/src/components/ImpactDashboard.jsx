import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// Replace localhost with Render backend URL
const API_URL = "https://notes-monitor-dashboard.onrender.com/api/notes";

const ImpactDashboard = () => {
    const [logs, setLogs] = useState([]);

    const fetchLogs = async () => {
        try {
            const res = await axios.get(`${API_URL}/debug/logs`);
            setLogs(res.data);
        } catch (err) {
            console.error("Monitor UI Error:", err);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 5000); 
        return () => clearInterval(interval);
    }, []);

    // Cloud Metrics Calculations
    const uptimePercent = logs.length > 0 
        ? ((logs.filter(l => l.isUp).length / logs.length) * 100).toFixed(2) 
        : 100;

    const avgLatency = logs.length > 0
        ? (logs.reduce((acc, l) => acc + (l.responseTimeMs || 0), 0) / logs.length).toFixed(0)
        : 0;

    const chartData = {
        labels: logs.map(l => new Date(l.timestamp).toLocaleTimeString()).reverse(),
        datasets: [{
            label: 'Latency (ms)',
            data: logs.map(l => l.isUp ? l.responseTimeMs : 0).reverse(),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
        }]
    };

    return (
        <div className="impact-card" style={{ 
            padding: '24px', 
            background: 'white', 
            borderRadius: '16px', 
            border: '2px solid #e2e8f0',
            marginTop: '20px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Cloud Performance Analyzer</h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>UPTIME</span>
                        <strong style={{ color: uptimePercent > 99 ? '#22c55e' : '#ef4444' }}>{uptimePercent}%</strong>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: '#64748b' }}>AVG LATENCY</span>
                        <strong>{avgLatency}ms</strong>
                    </div>
                </div>
            </div>

            <div style={{ height: '400px', width: '100%' }}>
                <Line data={chartData} options={{ 
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }} />
            </div>
            
            <div style={{ marginTop: '15px', padding: '10px', borderRadius: '8px', background: logs[0]?.isUp ? '#f0fdf4' : '#fef2f2', color: logs[0]?.isUp ? '#166534' : '#991b1b', fontWeight: 'bold' }}>
                Status: {logs[0]?.isUp ? '🟢 System Healthy' : '🔴 System Downtime Detected'}
            </div>
        </div>
    );
};

export default ImpactDashboard;
