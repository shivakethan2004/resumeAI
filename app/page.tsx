"use client";
import React, { useState, useEffect } from "react";
import {
  FileText,
  Wand2,
  Download,
  Eye,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Coins,
  LogOut,
  Plus,
  Trash2,
} from "lucide-react";
import ResumeBuilder from "@/components/ResumeBuilder";

// Types

// Main App Component
export default function App() {
  // Main App
  return <div className="min-h-screen bg-gray-50">
    <ResumeBuilder/>
  </div>;
}
