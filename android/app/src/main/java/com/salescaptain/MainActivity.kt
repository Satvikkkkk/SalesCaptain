package com.salescaptain

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.Manifest
import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.widget.Toast
import com.twiliovoicereactnative.VoiceActivityProxy

class MainActivity : ReactActivity() {

    private val activityProxy = VoiceActivityProxy(this) { permission ->
        when (permission) {
            Manifest.permission.RECORD_AUDIO -> Toast.makeText(
                this@MainActivity,
                "Microphone permissions needed. Please allow in your application settings.",
                Toast.LENGTH_LONG
            ).show()
            Manifest.permission.BLUETOOTH_CONNECT ->
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    Toast.makeText(
                        this@MainActivity,
                        "Bluetooth permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
            Manifest.permission.POST_NOTIFICATIONS ->
                if (Build.VERSION.SDK_INT > Build.VERSION_CODES.S_V2) {
                    Toast.makeText(
                        this@MainActivity,
                        "Notification permissions needed. Please allow in your application settings.",
                        Toast.LENGTH_LONG
                    ).show()
                }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        activityProxy.onCreate(savedInstanceState)
    }

    override fun onDestroy() {
        activityProxy.onDestroy()
        super.onDestroy()
    }

    override fun onNewIntent(intent: Intent?) {
        super.onNewIntent(intent)
        activityProxy.onNewIntent(intent)
    }

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String {
        return "salescaptain"
    }

    /**
     * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
     * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
