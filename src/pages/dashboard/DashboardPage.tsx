import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { t } from "i18next";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const DashboardPage: React.FC = () => {
  // Data for Employee Distribution (Pie Chart)
  const employeeData = {
    labels: ["Engineering", "Marketing", "Sales", "HR", "Operations"],
    datasets: [
      {
        data: [45, 25, 35, 15, 30],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Data for Project Status (Bar Chart)
  const projectData = {
    labels: ["In Progress", "Completed", "On Hold", "Planning"],
    datasets: [
      {
        label: "Number of Projects",
        data: [5, 3, 2, 2],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return ""

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm text-gray-500">{t("Total Employees")}</h3>
          <p className="text-2xl font-semibold">150</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm text-gray-500">{t("Active Projects")}</h3>
          <p className="text-2xl font-semibold">12</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm text-gray-500">{t("Departments")}</h3>
          <p className="text-2xl font-semibold">8</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h3 className="text-sm text-gray-500">{t("Total Tasks")}</h3>
          <p className="text-2xl font-semibold">64</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            {t("Employee Distribution")}
          </h2>
          <div className="h-64">
            <Pie data={employeeData} />
          </div>
        </div>
        <div className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-4 text-lg font-semibold">{t("Project Status")}</h2>
          <div className="h-64">
            <Bar options={barOptions} data={projectData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
