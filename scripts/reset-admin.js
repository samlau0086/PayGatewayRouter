import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import path from "path";

async function reset() {
  const dbPath = path.join(process.cwd(), "data.db");
  const db = new Database(dbPath);

  const email = "samlau0086@gmail.com";
  const newPassword = "admin123456";

  console.log(`正在尝试重置用户 ${email} 的密码...`);

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = db.prepare("UPDATE tenants SET password = ?, active = 1, otpEnabled = 0 WHERE email = ?").run(hashedPassword, email);

    if (result.changes === 0) {
      console.log("❌ 未在数据库中找到该邮箱对应的用户。");
      console.log("建议：请确保您已经运行过系统（例如通过 npm start 启动一次），以触发自动初始化逻辑。");
    } else {
      console.log("✅ 密码重置成功！");
      console.log(`- 账号: ${email}`);
      console.log(`- 新密码: ${newPassword}`);
      console.log("- 2FA/MFA 已强制关闭");
    }
  } catch (err) {
    console.error("❌ 执行失败:", err.message);
  } finally {
    db.close();
  }
}

reset();
