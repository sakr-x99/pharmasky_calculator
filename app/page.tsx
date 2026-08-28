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
    return new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(num);
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
    
    // 3. Amount due to finance company (1 month duration)
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
    <div dir="rtl" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-3 sm:p-6 md:p-10 font-sans relative overflow-hidden" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      
      {/* Dynamic Ambient Mint Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header Logo & Title */}
      <header className="mb-6 md:mb-8 flex flex-col items-center justify-center gap-3 text-center w-full max-w-4xl">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center justify-center">
            <img src="/logo.png" alt="PharmaSky Logo" className="h-14 sm:h-20 w-auto object-contain" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-400 mt-2">
            حاسبة أرباح وساطة التمويل
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">حساب دقيق وسريع لجميع التكاليف والأرباح الصافية</p>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
        
        {/* Input Form Card */}
        <section className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">مدخلات الحساب</h2>
                <p className="text-xs text-slate-400">أدخل قيم الصفقة بالأسفل</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Field 1 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">إجمالي البيع بسعر الجمهور</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="publicPriceMillions"
                    value={inputs.publicPriceMillions}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full bg-slate-950/70 border border-slate-800 text-emerald-300 font-semibold p-3.5 pl-20 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">مليون ج.م</span>
                </div>
              </div>

              {/* Field 2 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">نسبة خصم المخزن</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="warehouseDiscount"
                    value={inputs.warehouseDiscount}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full bg-slate-950/70 border border-slate-800 text-white font-semibold p-3.5 pl-12 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">%</span>
                </div>
              </div>

              {/* Field 3 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">نسبة ربح الوسيط من سعر الجمهور</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="middlemanPercent"
                    value={inputs.middlemanPercent}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full bg-slate-950/70 border border-slate-800 text-white font-semibold p-3.5 pl-12 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">%</span>
                </div>
              </div>

              {/* Field 4 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">نسبة شركة التمويل (شهرياً)</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="financePercent"
                    value={inputs.financePercent}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full bg-slate-950/70 border border-slate-800 text-white font-semibold p-3.5 pl-12 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">%</span>
                </div>
              </div>

              {/* Field 5 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">عمولات بيع (لشركة التمويل)</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="salesCommission"
                    value={inputs.salesCommission}
                    step="0.1"
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/70 border border-slate-800 text-white font-semibold p-3.5 pl-12 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">%</span>
                </div>
              </div>

              {/* Field 6 */}
              <div className="form-group">
                <label className="block mb-1.5 font-medium text-slate-300 text-xs sm:text-sm">مصاريف تحويل</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    name="transferFee"
                    value={inputs.transferFee}
                    step="0.01"
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/70 border border-slate-800 text-white font-semibold p-3.5 pl-12 rounded-xl outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-base transition-all"
                  />
                  <span className="absolute left-3.5 text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Card */}
        <section className="bg-slate-900/80 backdrop-blur-2xl border border-emerald-500/30 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          
          <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">ملخص الحسابات</h2>
              <p className="text-xs text-slate-400">النتائج المالية المفصلة</p>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-3.5 my-auto">
            
            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">تكلفة البضاعة (بعد الخصم)</span>
              <span className="text-sm sm:text-base font-bold text-slate-100">{formatMoney(results.costOfGoods)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">مدفوع شركة التمويل</span>
              <span className="text-sm sm:text-base font-bold text-emerald-400">{formatMoney(results.financePaid)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">المستحق لشركة التمويل</span>
              <span className="text-sm sm:text-base font-bold text-slate-100">{formatMoney(results.financeDue)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">المحصل من المخزن</span>
              <span className="text-sm sm:text-base font-bold text-teal-300">{formatMoney(results.collectedFromWarehouse)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">عمولات بيع التمويل</span>
              <span className="text-sm sm:text-base font-bold text-rose-400">-{formatMoney(results.salesCommissionAmt)}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/60 flex justify-between items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400 font-medium">مصاريف التحويل</span>
              <span className="text-sm sm:text-base font-bold text-rose-400">-{formatMoney(results.transferFeeAmt)}</span>
            </div>

          </div>

          {/* Highlighted Net Profit Footer */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-right shadow-[0_10px_25px_rgba(16,185,129,0.3)]">
              <div>
                <span className="text-emerald-100 text-xs sm:text-sm font-semibold uppercase tracking-wider block">صافي ربح الوسيط</span>
                <span className="text-emerald-200 text-[10px] sm:text-xs">بعد خصم التكاليف والعمولات</span>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow">
                {formatMoney(results.netProfit)}
              </span>
            </div>
          </div>

        </section>

      </main>

      {/* Footer copyright */}
      <footer className="mt-8 text-center text-xs text-slate-500">
        © PharmaSky Calculator. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
