"use client";

import React from "react";

// 1) swap to the public URL you confirmed works:
const STREAMLIT_URL = "https://ep-bp-simulator.streamlit.app/?embed=true";

export default function BpSimulatorEmbed() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            📈 Executive Partners – Business Plan Simulator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Private & Confidential – Fill out your business plan projection and
            download a secure PDF report.
          </p>
        </div>

        {/* 2) use a fixed height so it fits nicely */}
        <div className="relative w-full" style={{ height: "85vh" }}>
          <iframe
            src={STREAMLIT_URL}
            className="absolute inset-0 w-full h-full rounded-xl shadow-lg border border-gray-200"
            frameBorder="0"
            allowFullScreen
          />
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          Powered by Executive Partners · All data handled confidentially.
        </p>
      </div>
    </div>
  );
}
