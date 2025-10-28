import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, CreditCard } from "lucide-react"
import { formatCurrency, type Currency } from "@/lib/utils/currency"

// Cache revalidation configuration
export const revalidate = 60 // Revalidate every 60 seconds

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Fetch user's profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

  const userCurrency: Currency = profile?.currency || "USD"

  // Fetch accounts summary
  const { data: accounts } = await supabase.from("accounts").select("*").eq("user_id", user?.id)

  // Calculate total balance
  const totalBalance = accounts?.reduce((sum, account) => sum + Number(account.current_balance), 0) || 0

  // Fetch recent transactions
  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", user?.id)
    .order("date", { ascending: false })
    .limit(5)

  // Fetch accounts and categories for display
  const { data: allAccounts } = await supabase.from("accounts").select("id, name").eq("user_id", user?.id)
  const { data: allCategories } = await supabase.from("categories").select("id, name").eq("user_id", user?.id)
  const { data: allCreditCards } = await supabase.from("credit_cards").select("id, name").eq("user_id", user?.id)

  // Calculate monthly income and expenses
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyTransactions = transactions?.filter((t) => {
    const transactionDate = new Date(t.date)
    return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear
  })

  const monthlyIncome =
    monthlyTransactions?.filter((t) => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0) || 0

  const monthlyExpenses =
    monthlyTransactions?.filter((t) => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0) || 0

  // Fetch credit cards
  const { data: creditCards } = await supabase.from("credit_cards").select("*").eq("user_id", user?.id)

  // Helper functions to get names
  const getAccountName = (transaction: any) => {
    if (transaction.account_type === "account") {
      const account = allAccounts?.find(acc => acc.id === transaction.account_id)
      return account?.name || "Cuenta no encontrada"
    } else {
      const card = allCreditCards?.find(card => card.id === transaction.account_id)
      return card?.name || "Tarjeta no encontrada"
    }
  }

  const getCategoryName = (transaction: any) => {
    const category = allCategories?.find(cat => cat.id === transaction.category_id)
    return category?.name || "Sin categoría"
  }

  return (
    <div className="flex flex-col">

      <div className="flex-1 space-y-6 p-4 md:p-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">Balance Total</CardTitle>
              <Wallet className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-50 group-hover:text-sherwood-green-200 transition-colors duration-300">{formatCurrency(totalBalance, userCurrency)}</div>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">{accounts?.length || 0} cuentas activas</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">Ingresos del Mes</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-sherwood-green-200 group-hover:text-sherwood-green-100 transition-colors duration-300">{formatCurrency(monthlyIncome, userCurrency)}</div>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-red-500/30 hover:shadow-red-400/20 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-neutral-50 group-hover:text-red-300 transition-colors duration-300">Gastos del Mes</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400 group-hover:text-red-300 transition-colors duration-300">{formatCurrency(monthlyExpenses, userCurrency)}</div>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Este mes</p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors duration-300">Tarjetas de Crédito</CardTitle>
              <CreditCard className="h-4 w-4 text-primary group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-neutral-50 group-hover:text-sherwood-green-200 transition-colors duration-300">{creditCards?.length || 0}</div>
              <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Tarjetas activas</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-primary group-hover:text-primary/80 transition-colors duration-300">Transacciones Recientes</CardTitle>
            <CardDescription className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Tus últimas 5 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b border-neutral-800/50 pb-4 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-neutral-50">{transaction.description || "Sin descripción"}</p>
                      <p className="text-sm text-neutral-400">
                        {getCategoryName(transaction)} • {getAccountName(transaction)}
                      </p>
                      <p className="text-xs text-neutral-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div
                      className={`text-lg font-semibold ${transaction.type === "income" ? "text-sherwood-green-200" : "text-red-400"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(Number(transaction.amount), userCurrency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-400 py-8">No hay transacciones aún</p>
            )}
          </CardContent>
        </Card>

        {/* Accounts Overview */}
        <Card className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/50 shadow-2xl hover:bg-neutral-950/90 hover:border-sherwood-green-500/30 hover:shadow-sherwood-green-200/20 transition-all duration-300 group">
          <CardHeader>
            <CardTitle className="text-primary group-hover:text-primary/80 transition-colors duration-300">Mis Cuentas</CardTitle>
            <CardDescription className="text-neutral-400 group-hover:text-neutral-300 transition-colors duration-300">Resumen de tus cuentas</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts && accounts.length > 0 ? (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between border-b border-neutral-800/50 pb-4 last:border-0">
                    <div>
                      <p className="font-medium text-neutral-50">{account.name}</p>
                      <p className="text-sm text-neutral-400 capitalize">{account.type}</p>
                    </div>
                    <div className="text-lg font-semibold text-neutral-50">
                      {formatCurrency(Number(account.current_balance), userCurrency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-400 py-8">No tienes cuentas aún</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
