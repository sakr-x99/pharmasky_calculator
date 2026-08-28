"use client";
import React, { useState, useEffect } from 'react';

export default function ProfitCalculator() {
  const [inputs, setInputs] = useState({
    publicPriceMillions: 1,
    warehouseDiscount: 35,
    middlemanPercent: 2,
    financePercent: 2,
    salesCommission: 0.5,
    transferFee: 0,
  });

  const [results, setResults] = useState({
    costOfGoods: 0,
    financePaid: 0,
    financeDue: 0,
    collectedFromWarehouse: 0,
    salesCommissionAmt: 0,
    transferFeeAmt: 0,
    netProfit: 0,
  });

  const formatMoney = (num: number) => {
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(num);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  useEffect(() => {
    const publicPrice = inputs.publicPriceMillions * 1000000;
    
    // 1. Cost of goods after warehouse discount
    const costOfGoods = publicPrice * (1 - inputs.warehouseDiscount / 100);
    
    // 2. Amount paid by finance company
    const financePaid = costOfGoods;
    
    // 3. Amount due to finance company
    const financeInterest = financePaid * (inputs.financePercent / 100);
    const financeDue = financePaid + financeInterest;
    
    // 4. Amount collected from warehouse
    const middlemanTake = publicPrice * (inputs.middlemanPercent / 100);
    const collectedFromWarehouse = costOfGoods + middlemanTake;
    
    // Calculate extra fees
    const salesCommissionAmt = financePaid * (inputs.salesCommission / 100);
    const transferFeeAmt = financePaid * (inputs.transferFee / 100);
    
    // 5. Net Profit
    const netProfit = collectedFromWarehouse - financeDue - salesCommissionAmt - transferFeeAmt;

    setResults({
      costOfGoods,
      financePaid,
      financeDue,
      collectedFromWarehouse,
      salesCommissionAmt,
      transferFeeAmt,
      netProfit,
    });
  }, [inputs]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center p-4 md:p-8 font-sans" style={{ fontFamily: "'Tajawal', sans-serif", backgroundImage: "radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 50%)" }}>
      
      {/* Header Logo */}
      <div className="mb-8 flex flex-col items-center justify-center gap-2">
        <img src="/logo.png" alt="PharmaSky Logo" className="h-20 md:h-24 w-auto object-contain drop-shadow-lg" />
        <h1 className="text-xl md:text-2xl font-bold text-slate-200 tracking-wide text-center">حاسبة أرباح وساطة التمويل</h1>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-slate-800/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-indigo-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            مدخلات الحساب
          </h2>
          
          <div className="space-y-4">
            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">إجمالي البيع (بالملايين)</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">مليون</span>
                <input type="number" name="publicPriceMillions" value={inputs.publicPriceMillions} onChange={handleInputChange} step="0.1" className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">نسبة خصم المخزن</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">%</span>
                <input type="number" name="warehouseDiscount" value={inputs.warehouseDiscount} onChange={handleInputChange} className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">نسبة ربح الوسيط من سعر الجمهور</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">%</span>
                <input type="number" name="middlemanPercent" value={inputs.middlemanPercent} onChange={handleInputChange} className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">نسبة شركة التمويل (شهرياً)</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">%</span>
                <input type="number" name="financePercent" value={inputs.financePercent} onChange={handleInputChange} className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">عمولات بيع (لشركة التمويل)</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">%</span>
                <input type="number" name="salesCommission" value={inputs.salesCommission} step="0.1" onChange={handleInputChange} className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>

            <div className="form-group">
              <label className="block mb-2 font-medium text-slate-400 text-sm">مصاريف تحويل</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-slate-400 font-medium">%</span>
                <input type="number" name="transferFee" value={inputs.transferFee} step="0.01" onChange={handleInputChange} className="w-full bg-slate-900/60 border border-white/10 text-white p-3 pl-14 rounded-xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-slate-800/80 border border-indigo-500/20 rounded-3xl p-8 flex flex-col shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
            <span className="text-indigo-500">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </span>
            ملخص العمليات
          </h2>

          <div className="space-y-0 flex-grow">
            <div className="py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-slate-400 font-medium">تكلفة البضاعة (بعد خصم المخزن)</span>
              <span className="text-xl font-bold text-white">{formatMoney(results.costOfGoods)}</span>
            </div>

            <div className="py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-slate-400 font-medium">المبلغ المدفوع من شركة التمويل</span>
              <span className="text-xl font-bold text-white">{formatMoney(results.financePaid)}</span>
            </div>

            <div className="py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-slate-400 font-medium">المبلغ المستحق لشركة التمويل</span>
              <span className="text-xl font-bold text-white">{formatMoney(results.financeDue)}</span>
            </div>

            <div className="py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-slate-400 font-medium">المبلغ المحصل من المخزن</span>
              <span className="text-xl font-bold text-white">{formatMoney(results.collectedFromWarehouse)}</span>
            </div>

            <div className="py-4 border-b border-white/10 flex justify-between items-center">
              <span className="text-slate-400 font-medium">إجمالي عمولات البيع</span>
              <span className="text-xl font-bold text-red-400">-{formatMoney(results.salesCommissionAmt)}</span>
            </div>

            <div className="py-4 flex justify-between items-center">
              <span className="text-slate-400 font-medium">إجمالي مصاريف التحويل</span>
              <span className="text-xl font-bold text-red-400">-{formatMoney(results.transferFeeAmt)}</span>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-indigo-500 to-indigo-400 -mx-8 -mb-8 p-8 rounded-b-3xl flex justify-between items-center shadow-[0_-10px_30px_rgba(99,102,241,0.2)]">
            <span className="text-white/90 text-lg font-medium">صافي ربح الوسيط</span>
            <span className="text-3xl font-bold text-white drop-shadow-md">{formatMoney(results.netProfit)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
