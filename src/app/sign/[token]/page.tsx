"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { CheckCircle, Download, PenLine, Type, Upload, Trash2, X, AlertTriangle } from "lucide-react"

const MOCK_DOCUMENT = {
  title: "Enterprise Services Agreement",
  sentBy: "Orbas Technologies Ltd",
  signer: { name: "Jordan Clarke", email: "jordan@datavault.com" },
  fields: [
    { id: "f1", type: "signature", label: "Signature", required: true },
    { id: "f2", type: "initials",  label: "Initials",  required: true },
    { id: "f3", type: "date",      label: "Date",      required: false, value: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) },
  ],
}

const CONTRACT_TEXT = [
  {
    heading: "SERVICE AGREEMENT",
    sub: "This Agreement is entered into as of the date signed below between the parties identified herein.",
  },
  {
    paragraph: "1. PARTIES. This Service Agreement ('Agreement') is made between Orbas Technologies Ltd, a company registered in England and Wales with company number 12345678, having its registered office at 100 Victoria Street, London EC4V 4BY ('Service Provider'), and DataVault Ltd, a company registered in England and Wales with company number 87654321 ('Client').",
  },
  {
    paragraph: "2. SERVICES. Service Provider agrees to perform the following services: enterprise software licensing, implementation support, professional services, and ongoing maintenance as described in the attached Schedule A, which is incorporated herein by reference. Service Provider shall perform the Services in a professional and workmanlike manner consistent with industry standards.",
  },
  {
    paragraph: "3. PAYMENT TERMS. Client shall pay to Service Provider the fees set forth in Schedule B. Invoices shall be issued monthly in arrears and are payable within thirty (30) days of receipt. Late payments shall accrue interest at the rate of 4% per annum above the Bank of England base rate.",
  },
  {
    paragraph: "4. TERM AND TERMINATION. This Agreement shall commence on 1 January 2026 and shall continue for a period of twelve (12) months. Either party may terminate this Agreement upon ninety (90) days written notice. Termination shall not affect any rights or obligations that have already accrued.",
  },
  {
    paragraph: "5. CONFIDENTIALITY. Each party acknowledges that it may receive Confidential Information from the other party. Each party agrees to maintain the confidentiality of the other party's Confidential Information using the same degree of care it uses to protect its own confidential information, but in no event less than reasonable care.",
  },
  {
    paragraph: "6. INTELLECTUAL PROPERTY. All intellectual property rights in the Service Provider's software, tools, and deliverables remain the exclusive property of the Service Provider. Client is granted a non-exclusive, non-transferable licence to use the software solely for its internal business purposes during the term of this Agreement.",
  },
  {
    paragraph: "7. LIMITATION OF LIABILITY. To the maximum extent permitted by applicable law, neither party shall be liable to the other for any indirect, incidental, special, consequential, or punitive damages. Service Provider's total liability under this Agreement shall not exceed the total fees paid in the twelve months preceding the claim.",
  },
  {
    paragraph: "8. GOVERNING LAW. This Agreement shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising under this Agreement shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    paragraph: "IN WITNESS WHEREOF, the parties have executed this Agreement as of the date written below.",
  },
]

type SigTab = "draw" | "type" | "upload"
type Field = { id: string; type: string; label: string; required: boolean; value?: string }

export default function PublicSignPage() {
  const params = useParams()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const [sigTab, setSigTab] = useState<SigTab>("draw")
  const [typedSig, setTypedSig] = useState("")
  const [hasDrawn, setHasDrawn] = useState(false)
  const [initialsValue, setInitialsValue] = useState("")
  const [completed, setCompleted] = useState(false)
  const [declined, setDeclined] = useState(false)
  const [activeField, setActiveField] = useState<string | null>("f1")
  const [completedFields, setCompletedFields] = useState<Record<string, boolean>>({
    f3: true
  })

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#1a56db"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
  }, [])

  useEffect(() => {
    initCanvas()
  }, [initCanvas])

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    setIsDrawing(true)
    setHasDrawn(true)
    setLastPos(getPos(e))
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawing) return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    setLastPos(pos)
  }

  const stopDraw = () => setIsDrawing(false)

  const clearCanvas = () => {
    initCanvas()
    setHasDrawn(false)
  }

  const isSigReady = sigTab === "draw" ? hasDrawn : sigTab === "type" ? typedSig.trim().length > 0 : false
  const isInitialsReady = initialsValue.trim().length > 0

  const allFieldsComplete = isSigReady && isInitialsReady

  const handleComplete = () => {
    if (!allFieldsComplete) return
    setCompleted(true)
  }

  if (declined) {
    return (
      <div style={{ minHeight: "100vh", background: "#f8fafc", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "white", borderRadius: "16px", padding: "40px", maxWidth: "440px", width: "100%", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <X size={32} color="#dc2626" />
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "8px" }}>Document Declined</h2>
          <p style={{ fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
            You have declined to sign this document. The sender has been notified.
          </p>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f0fdf4 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ background: "white", borderRadius: "20px", padding: "48px 40px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #22c55e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
            <CheckCircle size={40} color="white" />
          </div>
          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#111827", marginBottom: "10px" }}>Document Signed Successfully</h2>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6, marginBottom: "8px" }}>
            You have successfully signed <strong style={{ color: "#111827" }}>{MOCK_DOCUMENT.title}</strong>.
          </p>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginBottom: "32px" }}>
            All parties will be notified and a copy will be sent to your email address.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 600,
                background: "linear-gradient(135deg, #1a56db, #06b6d4)", color: "white",
                border: "none", cursor: "pointer", width: "100%"
              }}
            >
              <Download size={16} /> Download Your Copy
            </button>
            <p style={{ fontSize: "12px", color: "#9ca3af" }}>
              Signed on {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · Secured by Orbas eSign
            </p>
          </div>
        </div>
        <div style={{ marginTop: "24px", display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg, #1a56db, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontSize: "12px", fontWeight: 800 }}>O</span>
          </div>
          <span style={{ fontSize: "12px", color: "#9ca3af" }}>Powered by Orbas eSign</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <header style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "8px",
            background: "linear-gradient(135deg, #1a56db, #06b6d4)",
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <span style={{ color: "white", fontSize: "16px", fontWeight: 800 }}>O</span>
          </div>
          <div>
            <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Orbas</span>
            <span style={{ fontSize: "12px", color: "#6b7280", marginLeft: "4px" }}>eSign</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a" }} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Secure signing session</span>
        </div>
      </header>

      <div style={{
        background: "#1e293b",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px"
      }}>
        <div>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "white", margin: 0 }}>{MOCK_DOCUMENT.title}</p>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0, marginTop: "2px" }}>
            Sent by <strong style={{ color: "#cbd5e1" }}>{MOCK_DOCUMENT.sentBy}</strong>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f59e0b22", borderRadius: "8px", padding: "6px 12px" }}>
          <AlertTriangle size={13} color="#f59e0b" />
          <span style={{ fontSize: "12px", color: "#fcd34d" }}>Action required — please review and sign</span>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1300px", margin: "0 auto", padding: "24px", gap: "24px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{
              background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
              padding: "12px 20px", display: "flex", alignItems: "center", gap: "8px"
            }}>
              <PenLine size={15} color="#1a56db" />
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>{MOCK_DOCUMENT.title}.pdf</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "#9ca3af" }}>Page 1 of 3</span>
            </div>
            <div style={{ padding: "40px 48px", background: "white", minHeight: "800px" }}>
              {CONTRACT_TEXT.map((block, i) => {
                if (block.heading) {
                  return (
                    <div key={i} style={{ textAlign: "center", marginBottom: "32px" }}>
                      <p style={{ fontSize: "16px", fontWeight: 800, color: "#111827", letterSpacing: "0.05em", marginBottom: "4px" }}>{block.heading}</p>
                      {block.sub && <p style={{ fontSize: "12px", color: "#6b7280" }}>{block.sub}</p>}
                    </div>
                  )
                }
                return (
                  <p key={i} style={{ fontSize: "13px", color: "#374151", lineHeight: 1.8, marginBottom: "16px" }}>
                    {block.paragraph}
                  </p>
                )
              })}

              <div style={{ marginTop: "48px", borderTop: "1px solid #e2e8f0", paddingTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Service Provider</p>
                  <div style={{ height: "60px", border: "1.5px dashed #1a56db", borderRadius: "6px", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "11px", color: "#1a56db" }}>Signature</span>
                  </div>
                  <div style={{ borderBottom: "1px solid #374151", paddingBottom: "4px", marginBottom: "4px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>Orbas Technologies Ltd</p>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9ca3af" }}>Date: {new Date().toLocaleDateString("en-GB")}</p>
                </div>
                <div>
                  <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "8px" }}>Client Representative</p>
                  <div style={{
                    height: "60px",
                    border: `1.5px dashed ${completedFields.f1 ? "#16a34a" : "#1a56db"}`,
                    borderRadius: "6px",
                    background: completedFields.f1 ? "#f0fdf4" : "#eff6ff",
                    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "6px",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                    onClick={() => setActiveField("f1")}
                  >
                    {completedFields.f1
                      ? <span style={{ fontSize: "13px", color: "#16a34a", fontWeight: 600 }}>✓ Signed</span>
                      : <span style={{ fontSize: "11px", color: "#1a56db" }}>Click to sign →</span>}
                  </div>
                  <div style={{ borderBottom: "1px solid #374151", paddingBottom: "4px", marginBottom: "4px" }}>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{MOCK_DOCUMENT.signer.name}</p>
                  </div>
                  <p style={{ fontSize: "11px", color: "#9ca3af" }}>Date: {new Date().toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: "340px", flexShrink: 0, position: "sticky", top: "84px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0 }}>Signing As</p>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #1a56db, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 700, flexShrink: 0 }}>
                  {MOCK_DOCUMENT.signer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#111827", margin: 0 }}>{MOCK_DOCUMENT.signer.name}</p>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{MOCK_DOCUMENT.signer.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0 }}>Fields to Complete</p>
              <p style={{ fontSize: "11px", color: "#6b7280", margin: "2px 0 0" }}>
                {Object.keys(completedFields).length} of {MOCK_DOCUMENT.fields.length} completed
              </p>
            </div>
            <div style={{ padding: "12px 16px" }}>
              {MOCK_DOCUMENT.fields.map(field => {
                const done = !!completedFields[field.id]
                return (
                  <div
                    key={field.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
                      borderRadius: "8px", marginBottom: "6px", cursor: "pointer", transition: "all 0.15s",
                      border: `1.5px solid ${activeField === field.id ? "#1a56db" : done ? "#16a34a" : "#e2e8f0"}`,
                      background: activeField === field.id ? "#eff6ff" : done ? "#f0fdf4" : "#fafafa"
                    }}
                    onClick={() => setActiveField(field.id)}
                  >
                    <div style={{
                      width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "#16a34a" : "#e2e8f0"
                    }}>
                      {done
                        ? <CheckCircle size={14} color="white" />
                        : <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280" }}>{MOCK_DOCUMENT.fields.indexOf(field) + 1}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "12px", fontWeight: 600, color: "#111827", margin: 0 }}>{field.label}</p>
                      {field.value && <p style={{ fontSize: "11px", color: "#6b7280", margin: 0 }}>{field.value}</p>}
                      {field.required && !done && (
                        <p style={{ fontSize: "10px", color: "#dc2626", margin: 0 }}>Required</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {activeField === "f1" && (
            <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0 }}>Your Signature</p>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", borderRadius: "8px", overflow: "hidden", border: "1px solid #e2e8f0", marginBottom: "12px" }}>
                  {(["draw", "type", "upload"] as SigTab[]).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSigTab(tab)}
                      style={{
                        flex: 1, padding: "7px", fontSize: "12px", fontWeight: 600,
                        background: sigTab === tab ? "#1a56db" : "white",
                        color: sigTab === tab ? "white" : "#6b7280",
                        border: "none", cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s"
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                {sigTab === "draw" && (
                  <div>
                    <canvas
                      ref={canvasRef}
                      width={290}
                      height={100}
                      style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: "8px", cursor: "crosshair", touchAction: "none", display: "block" }}
                      onMouseDown={startDraw}
                      onMouseMove={draw}
                      onMouseUp={stopDraw}
                      onMouseLeave={stopDraw}
                      onTouchStart={startDraw}
                      onTouchMove={draw}
                      onTouchEnd={stopDraw}
                    />
                    <p style={{ fontSize: "10px", color: "#9ca3af", textAlign: "center", margin: "6px 0 0" }}>Draw your signature above</p>
                    <button
                      onClick={clearCanvas}
                      style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#6b7280", background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}
                    >
                      <Trash2 size={11} /> Clear
                    </button>
                    {hasDrawn && (
                      <button
                        onClick={() => { setCompletedFields(p => ({ ...p, f1: true })); setActiveField("f2") }}
                        style={{
                          marginTop: "10px", width: "100%", padding: "8px", borderRadius: "8px",
                          background: "#16a34a", color: "white", fontWeight: 600, fontSize: "12px",
                          border: "none", cursor: "pointer"
                        }}
                      >
                        Apply Signature
                      </button>
                    )}
                  </div>
                )}
                {sigTab === "type" && (
                  <div>
                    <input
                      type="text"
                      placeholder="Type your full name…"
                      value={typedSig}
                      onChange={e => setTypedSig(e.target.value)}
                      style={{
                        width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
                        fontSize: "18px", fontFamily: "'Dancing Script', cursive, Georgia, serif",
                        color: "#1a1a1a", outline: "none", boxSizing: "border-box"
                      }}
                    />
                    <p style={{ fontSize: "10px", color: "#9ca3af", marginTop: "6px" }}>This will serve as your electronic signature</p>
                    {typedSig.trim() && (
                      <button
                        onClick={() => { setCompletedFields(p => ({ ...p, f1: true })); setActiveField("f2") }}
                        style={{
                          marginTop: "10px", width: "100%", padding: "8px", borderRadius: "8px",
                          background: "#16a34a", color: "white", fontWeight: 600, fontSize: "12px",
                          border: "none", cursor: "pointer"
                        }}
                      >
                        Apply Signature
                      </button>
                    )}
                  </div>
                )}
                {sigTab === "upload" && (
                  <div style={{ border: "1.5px dashed #e2e8f0", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
                    <Upload size={20} color="#9ca3af" style={{ marginBottom: "6px" }} />
                    <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Upload signature image</p>
                    <p style={{ fontSize: "11px", color: "#9ca3af" }}>PNG or JPG, max 2MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeField === "f2" && (
            <div style={{ background: "white", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", overflow: "hidden" }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid #e2e8f0", background: "#f8fafc" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#111827", margin: 0 }}>Your Initials</p>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <input
                  type="text"
                  placeholder="e.g. JC"
                  maxLength={4}
                  value={initialsValue}
                  onChange={e => setInitialsValue(e.target.value.toUpperCase())}
                  style={{
                    width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
                    fontSize: "20px", fontWeight: 700, textAlign: "center", color: "#1a1a1a",
                    letterSpacing: "0.1em", outline: "none", boxSizing: "border-box"
                  }}
                />
                <p style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px", textAlign: "center" }}>Enter your initials</p>
                {initialsValue.trim() && (
                  <button
                    onClick={() => { setCompletedFields(p => ({ ...p, f2: true })); setActiveField(null) }}
                    style={{
                      marginTop: "10px", width: "100%", padding: "8px", borderRadius: "8px",
                      background: "#16a34a", color: "white", fontWeight: 600, fontSize: "12px",
                      border: "none", cursor: "pointer"
                    }}
                  >
                    Apply Initials
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              onClick={handleComplete}
              disabled={!allFieldsComplete}
              style={{
                width: "100%", padding: "14px", borderRadius: "12px", fontSize: "14px", fontWeight: 700,
                background: allFieldsComplete ? "linear-gradient(135deg, #1a56db, #06b6d4)" : "#e2e8f0",
                color: allFieldsComplete ? "white" : "#9ca3af",
                border: "none", cursor: allFieldsComplete ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: allFieldsComplete ? "0 4px 16px rgba(26,86,219,0.3)" : "none",
                transition: "all 0.2s"
              }}
            >
              <CheckCircle size={16} />
              {allFieldsComplete ? "Complete & Sign" : "Complete all fields to sign"}
            </button>
            <button
              onClick={() => setDeclined(true)}
              style={{
                width: "100%", padding: "10px", borderRadius: "12px", fontSize: "13px", fontWeight: 500,
                background: "white", color: "#dc2626", border: "1.5px solid #fee2e2",
                cursor: "pointer", transition: "all 0.15s"
              }}
            >
              Decline to Sign
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "8px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #1a56db, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: "9px", fontWeight: 800 }}>O</span>
            </div>
            <span style={{ fontSize: "11px", color: "#9ca3af" }}>Secured by Orbas eSign · 256-bit SSL</span>
          </div>
        </div>
      </div>
    </div>
  )
}
