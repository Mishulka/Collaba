export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Настройки аккаунта</h1>
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Профиль</h3>
          <p className="text-gray-600">Изменить данные профиля</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Безопасность</h3>
          <p className="text-gray-600">Настройки безопасности аккаунта</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Уведомления</h3>
          <p className="text-gray-600">Настройки уведомлений</p>
        </div>
      </div>
    </div>
  );
}
