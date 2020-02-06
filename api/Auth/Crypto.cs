using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace MccAchievementApp.Api.Auth
{
    public static class Crypto
    {
        private static Lazy<byte[]> Key = new Lazy<byte[]>(() =>
            Convert.FromBase64String(Environment.GetEnvironmentVariable("TokenEncryptionKey")));

        public static string Encrypt(string payload)
        {
            using var sha = SHA256.Create();
            using var aes = Aes.Create();
            aes.GenerateIV();

            var payloadBytes = Encoding.UTF8.GetBytes(payload);
            var payloadHash = sha.ComputeHash(payloadBytes);

            using var encryptor = aes.CreateEncryptor(Key.Value, aes.IV);
            using var cipherText = new MemoryStream();

            using (var cryptoStream = new CryptoStream(cipherText, encryptor, CryptoStreamMode.Write))
            {
                cryptoStream.Write(payloadBytes);
                cryptoStream.Write(payloadHash);
            }

            var iv = aes.IV;
            var cipherTextBytes = cipherText.ToArray();

            var result = new byte[iv.Length + cipherTextBytes.Length];

            Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
            Buffer.BlockCopy(cipherTextBytes, 0, result, iv.Length, cipherTextBytes.Length);

            return Convert.ToBase64String(result);
        }

        public static string Decrypt(string cipherText)
        {
            var cipherAndIvBytes = Convert.FromBase64String(cipherText);

            var iv = new byte[16];
            var cipher = new byte[cipherAndIvBytes.Length - 16];

            Buffer.BlockCopy(cipherAndIvBytes, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(cipherAndIvBytes, iv.Length, cipher, 0, cipher.Length);

            using var sha = SHA256.Create();
            using var aes = Aes.Create();
            using var decryptor = aes.CreateDecryptor(Key.Value, iv);

            using var decryptedByteStream = new MemoryStream();

            using (var cipherStream = new MemoryStream(cipher))
            using (var decryptStream = new CryptoStream(cipherStream, decryptor, CryptoStreamMode.Read))
            {
                decryptStream.CopyTo(decryptedByteStream);
            }

            var decryptedBytes = decryptedByteStream.ToArray();
            var hash = new byte[256 / 8];
            var payload = new byte[decryptedByteStream.Length - hash.Length];

            Buffer.BlockCopy(decryptedBytes, 0, payload, 0, payload.Length);
            Buffer.BlockCopy(decryptedBytes, payload.Length, hash, 0, hash.Length);

            var calculatedHash = sha.ComputeHash(payload);

            if(BytesAreEqual(hash, calculatedHash) == false)
            {
                throw new Exception("Hashes did not match, tampering or corruption detected");
            }

            return Encoding.UTF8.GetString(payload);
        }

        private static bool BytesAreEqual(ReadOnlySpan<byte> a1, ReadOnlySpan<byte> a2)
        {
            return a1.SequenceEqual(a2);
        }
    }
}
