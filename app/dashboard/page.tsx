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
          <Card className="bg-card border-neutral-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Balance Total</CardTitle>
              <Wallet className="h-4 w-4 text-sherwood-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{formatCurrency(totalBalance, userCurrency)}</div>
              <p className="text-xs text-neutral-400">{accounts?.length || 0} cuentas activas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(monthlyIncome, userCurrency)}</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{formatCurrency(monthlyExpenses, userCurrency)}</div>
              <p className="text-xs text-muted-foreground">Este mes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tarjetas de Crédito</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{creditCards?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Tarjetas activas</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transacciones Recientes</CardTitle>
            <CardDescription>Tus últimas 5 transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions && transactions.length > 0 ? (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{transaction.description || "Sin descripción"}</p>
                      <p className="text-sm text-muted-foreground">
                        {getCategoryName(transaction)} • {getAccountName(transaction)}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div
                      className={`text-lg font-semibold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(Number(transaction.amount), userCurrency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No hay transacciones aún</p>
            )}
          </CardContent>
        </Card>

        {/* Accounts Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Cuentas</CardTitle>
            <CardDescription>Resumen de tus cuentas</CardDescription>
          </CardHeader>
          <CardContent>
            {accounts && accounts.length > 0 ? (
              <div className="space-y-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                    </div>
                    <div className="text-lg font-semibold">
                      {formatCurrency(Number(account.current_balance), userCurrency)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No tienes cuentas aún</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
